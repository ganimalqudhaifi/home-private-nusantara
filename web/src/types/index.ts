export type LevelType = 'SD' | 'SMP';

export type SubjectGrade = {
  readonly id: string;
  readonly level: LevelType;
  readonly grade: number;
  readonly name: string;
};

export type TutorStatus = 'pending' | 'verified' | 'active' | 'on_leave' | 'inactive' | 'suspended' | 'rejected';

export type TimeSlot = {
  readonly id: string;
  readonly day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu' | 'Minggu';
  readonly startTime: string;
  readonly endTime: string;
  readonly isBooked?: boolean;
  readonly studentName?: string;
  readonly subject?: string;
};

export type Tutor = {
  readonly id: string;
  readonly name: string;
  readonly title: string;
  readonly avatar: string;
  readonly university: string;
  readonly rating?: number;
  readonly reviewCount?: number;
  readonly hourlyRate?: number;
  readonly subjects: readonly string[];
  readonly grades?: readonly string[];
  readonly bio?: string;
  readonly isVerified: boolean;
  readonly status: TutorStatus;
  readonly registerDate?: string;
  readonly phone: string;
  readonly experienceYears?: number;
  readonly availableDays?: readonly string[];
  readonly availableSlots?: readonly TimeSlot[];
  readonly portfolioUrl?: string;
};

export type StudentSession = {
  readonly id: string;
  readonly code: string;
  readonly studentName: string;
  readonly parentName: string;
  readonly parentPhone: string;
  readonly tutorId: string;
  readonly tutorName: string;
  readonly level: LevelType;
  readonly grade: number;
  readonly subject: string;
  readonly date: string;
  readonly day: string;
  readonly time: string;
  readonly address: string;
  readonly district: string;
  readonly city: string;
  readonly mapsUrl?: string;
  readonly notes?: string;
  readonly status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  readonly amount: number;
};

export type Student = {
  readonly id: string;
  readonly name: string;
  readonly level: LevelType;
  readonly grade: number;
  readonly school: string;
  readonly parentName: string;
  readonly parentPhone: string;
  readonly address: string;
  readonly totalSessions: number;
  readonly activeBookings: number;
  readonly joinDate: string;
};

export type AdminKPI = {
  readonly activeTutors: number;
  readonly pendingTutors: number;
  readonly registeredStudents: {
    readonly total: number;
    readonly sd: number;
    readonly smp: number;
  };
  readonly totalBookings: number;
  readonly doubleBookingRate: string;
};
