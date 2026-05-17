import { Connection, Document, Schema } from 'mongoose';
import { connectApplicationDB } from './db';

const commonTransform = {
  virtuals: true,
  versionKey: false,
  transform: (_doc: any, ret: any) => {
    ret.id = ret._id.toString();
    return ret;
  }
};

/**
 * Represents an Employee entity in the multi-tenant HRMS system.
 * Contains core personnel information.
 * 
 * @interface IEmployee
 * @extends {Document}
 */
export interface IEmployee extends Document {
  id: string
  organizationId: string
  firstName: string
  lastName: string
  email: string
  department: string
  role?: string
  joiningDate?: Date
  birthday?: Date
  managerName?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const EmployeeSchema = new Schema<IEmployee>({
  organizationId: { type: String, required: true, index: true }, // Crucial for Multi-tenant isolation
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String },
  role: { type: String },
  joiningDate: { type: Date },
  birthday: { type: Date },
  managerName: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true, toJSON: commonTransform, toObject: commonTransform })

export async function getEmployeeModel(tenantId: string) {
  const db: Connection = await connectApplicationDB(tenantId)
  if (!db) throw new Error("Application DB connection failed")
  
  return db.models.Employee || db.model<IEmployee>('Employee', EmployeeSchema)
}

/**
 * Represents a daily attendance log for an employee within a specific organization.
 * 
 * @interface IAttendance
 * @extends {Document}
 */
export interface IAttendance extends Document {
  id: string;
  organizationId: string;
  employeeId: string | import('mongoose').Types.ObjectId;
  date: Date;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'HALF_DAY';
  checkIn?: Date;
  checkOut?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AttendanceSchema = new Schema<IAttendance>({
  organizationId: { type: String, required: true, index: true },
  employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['PRESENT', 'ABSENT', 'LATE', 'HALF_DAY'], required: true },
  checkIn: { type: Date },
  checkOut: { type: Date },
}, { timestamps: true, toJSON: commonTransform, toObject: commonTransform });

export async function getAttendanceModel(tenantId: string) {
  const db: Connection = await connectApplicationDB(tenantId);
  if (!db) throw new Error("Application DB connection failed");
  return db.models.Attendance || db.model<IAttendance>('Attendance', AttendanceSchema);
}

/**
 * Represents a time-off or vacation request submitted by an employee.
 * 
 * @interface ILeaveRequest
 * @extends {Document}
 */
export interface ILeaveRequest extends Document {
  id: string;
  organizationId: string;
  employeeId: string | import('mongoose').Types.ObjectId;
  startDate: Date;
  endDate: Date;
  type: 'SICK' | 'VACATION' | 'PERSONAL';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  reason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeaveRequestSchema = new Schema<ILeaveRequest>({
  organizationId: { type: String, required: true, index: true },
  employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  type: { type: String, enum: ['SICK', 'VACATION', 'PERSONAL'], required: true },
  status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
  reason: { type: String },
}, { timestamps: true, toJSON: commonTransform, toObject: commonTransform });

export async function getLeaveRequestModel(tenantId: string) {
  const db: Connection = await connectApplicationDB(tenantId);
  if (!db) throw new Error("Application DB connection failed");
  return db.models.LeaveRequest || db.model<ILeaveRequest>('LeaveRequest', LeaveRequestSchema);
}

/**
 * Represents general HR configuration settings for the tenant organization.
 * 
 * @interface IHRSettings
 * @extends {Document}
 */
export interface IHRSettings extends Document {
  id: string;
  organizationId: string;
  companyName: string;
  workWeekStart: string;
  workWeekEnd: string;
  standardCheckIn: string;
  standardCheckOut: string;
  allowSelfAttendance: boolean;
  defaultLeaveAllowance: number;
  createdAt: Date;
  updatedAt: Date;
}

const HRSettingsSchema = new Schema<IHRSettings>({
  organizationId: { type: String, required: true, unique: true, index: true },
  companyName: { type: String, default: "MKX Technologies Tenant" },
  workWeekStart: { type: String, default: "Monday" },
  workWeekEnd: { type: String, default: "Friday" },
  standardCheckIn: { type: String, default: "09:00" },
  standardCheckOut: { type: String, default: "18:00" },
  allowSelfAttendance: { type: Boolean, default: true },
  defaultLeaveAllowance: { type: Number, default: 21 },
}, { timestamps: true, toJSON: commonTransform, toObject: commonTransform });

export async function getHRSettingsModel(tenantId: string) {
  const db: Connection = await connectApplicationDB(tenantId);
  if (!db) throw new Error("Application DB connection failed");
  return db.models.HRSettings || db.model<IHRSettings>('HRSettings', HRSettingsSchema);
}

/**
 * Represents a system activity or audit log record for an organization.
 * 
 * @interface IActivityLog
 * @extends {Document}
 */
export interface IActivityLog extends Document {
  id: string;
  organizationId: string;
  userEmail: string;
  action: string;
  details: string;
  ipAddress?: string;
  createdAt: Date;
}

const ActivityLogSchema = new Schema<IActivityLog>({
  organizationId: { type: String, required: true, index: true },
  userEmail: { type: String, required: true },
  action: { type: String, required: true },
  details: { type: String },
  ipAddress: { type: String },
}, { timestamps: { createdAt: true, updatedAt: false }, toJSON: commonTransform, toObject: commonTransform });

export async function getActivityLogModel(tenantId: string) {
  const db: Connection = await connectApplicationDB(tenantId);
  if (!db) throw new Error("Application DB connection failed");
  return db.models.ActivityLog || db.model<IActivityLog>('ActivityLog', ActivityLogSchema);
}
