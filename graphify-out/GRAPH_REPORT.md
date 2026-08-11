# Graph Report - D:\Projects\Business\Home Private Nusantara  (2026-08-12)

## Corpus Check
- 144 files · ~203,264 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 205 nodes · 49 edges · 157 communities (25 shown, 132 thin omitted)
- Extraction: 67% EXTRACTED · 33% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.9)
- Token cost: 25,371 input · 6,705 output

## Community Hubs (Navigation)
- Component 0
- Component 1
- Component 2
- Component 3
- Component 4
- Component 5
- Component 6
- Component 7
- Component 8
- Component 9
- Component 11
- Component 16
- Component 17
- Component 18
- Component 19
- Component 20
- Component 21
- Component 22
- Component 31
- Component 34
- Component 35
- Component 36
- Component 37
- Component 38
- Component 39
- Component 40
- Component 41
- Component 42
- Component 43
- Component 44
- Component 45
- Component 46
- Component 47
- Component 48
- Component 49
- Component 50
- Component 51
- Component 52
- Component 53
- Component 54
- Component 55
- Component 56
- Component 57
- Component 58
- Component 59
- Component 60
- Component 61
- Component 62
- Component 63
- Component 64
- Component 65
- Component 66
- Component 67
- Component 68
- Component 69
- Component 70
- Component 71
- Component 72
- Component 73
- Component 74
- Component 75
- Component 76
- Component 77
- Component 78
- Component 79
- Component 80
- Component 81
- Component 82
- Component 83
- Component 84
- Component 85
- Component 86
- Component 87
- Component 88
- Component 89
- Component 90
- Component 91
- Component 92
- Component 93
- Component 94
- Component 95
- Component 96
- Component 97
- Component 98
- Component 99
- Component 100
- Component 101
- Component 102
- Component 103
- Component 104
- Component 105
- Component 106
- Component 107
- Component 108
- Component 109
- Component 110
- Component 111
- Component 112
- Component 113
- Component 114
- Component 115
- Component 116
- Component 117
- Component 118
- Component 119
- Component 120
- Component 121
- Component 122
- Component 123
- Component 124
- Component 125
- Component 126
- Component 127
- Component 128
- Component 129
- Component 130
- Component 131
- Component 132
- Component 133
- Component 134
- Component 135
- Component 136
- Component 137
- Component 138
- Component 139
- Component 140
- Component 141
- Component 142
- Component 143
- Component 144
- Component 145
- Component 146
- Component 147
- Component 148
- Component 149
- Component 150
- Component 151
- Component 152
- Component 153
- Component 154
- Component 155
- Component 156

## God Nodes (most connected - your core abstractions)
1. `Tutor` - 7 edges
2. `StudentSession` - 5 edges
3. `Student` - 5 edges
4. `Design System` - 5 edges
5. `Tutor Portal Dashboard` - 3 edges
6. `TutorAuditDrawerProps` - 2 edges
7. `TimeSlot` - 2 edges
8. `09-admin-tutor-management UI Design` - 2 edges
9. `Tutor Management Interface` - 2 edges
10. `Admin Dashboard Layout` - 2 edges

## Surprising Connections (you probably didn't know these)
- `AdminScheduleMonitoringGridProps` --references--> `StudentSession`  [EXTRACTED]
  web/src/components/admin/AdminScheduleMonitoringGrid.tsx → web/src/types/index.ts
- `CreateScheduleRundownModalProps` --references--> `StudentSession`  [EXTRACTED]
  web/src/components/admin/CreateScheduleRundownModal.tsx → web/src/types/index.ts
- `CreateStudentModalProps` --references--> `Student`  [EXTRACTED]
  web/src/components/admin/CreateStudentModal.tsx → web/src/types/index.ts
- `DeleteStudentModalProps` --references--> `Student`  [EXTRACTED]
  web/src/components/admin/DeleteStudentModal.tsx → web/src/types/index.ts
- `DeleteTutorModalProps` --references--> `Tutor`  [EXTRACTED]
  web/src/components/admin/DeleteTutorModal.tsx → web/src/types/index.ts

## Import Cycles
- None detected.

## Communities (157 total, 132 thin omitted)

### Community 0 - "Component 0"
Cohesion: 0.22
Nodes (9): DeleteTutorModalProps, EditTutorModalProps, ActionType, TutorActionModalProps, TutorAuditDrawerProps, TutorDirectoryTableProps, UrgentTutorVerificationQueueTableProps, InteractiveTutorPreviewCardProps (+1 more)

### Community 1 - "Component 1"
Cohesion: 0.33
Nodes (6): Student Portal, Admin Dashboard, Admin Tutor Management, Admin Students & Booking Monitor, Design System, Stitch Screen Prompts Catalog

### Community 2 - "Component 2"
Cohesion: 0.33
Nodes (6): AdminScheduleMonitoringGridProps, CreateScheduleRundownModalProps, TutorStudentDrawerProps, TutorUpcomingSessionsCardProps, TutorWeeklyScheduleGridProps, StudentSession

### Community 3 - "Component 3"
Cohesion: 0.33
Nodes (6): CreateStudentModalProps, DeleteStudentModalProps, EditStudentModalProps, StudentDirectoryTableProps, TutorRecentStudentsCardProps, Student

### Community 4 - "Component 4"
Cohesion: 0.50
Nodes (4): Tutor Dashboard Stats, Quick Actions, Tutor Portal Dashboard, Upcoming Session Schedule

### Community 5 - "Component 5"
Cohesion: 0.67
Nodes (3): Pending Status, Tutor Portal Pending Screen, Tutor Portal

### Community 6 - "Component 6"
Cohesion: 0.67
Nodes (3): Calendar View, Tutor Availability Screen, Time Slots

### Community 7 - "Component 7"
Cohesion: 0.67
Nodes (3): Booking, Student Search, Student Search Booking UI

### Community 8 - "Component 8"
Cohesion: 1.00
Nodes (3): Admin Dashboard Layout, 09-admin-tutor-management UI Design, Tutor Management Interface

### Community 9 - "Component 9"
Cohesion: 0.67
Nodes (3): TutorTimeSlotBuilderProps, UseAvailabilityProps, TimeSlot

## Knowledge Gaps
- **171 isolated node(s):** `AdminBookingsPageProps`, `AdminBookingsPage`, `AdminDashboardPageProps`, `AdminLayout`, `AdminStudentsPage` (+166 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **132 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 3 inferred relationships involving `Tutor Portal Dashboard` (e.g. with `Tutor Dashboard Stats` and `Quick Actions`) actually correct?**
  _`Tutor Portal Dashboard` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `AdminBookingsPageProps`, `AdminBookingsPage`, `AdminDashboardPageProps` to the rest of the system?**
  _171 weakly-connected nodes found - possible documentation gaps or missing edges._