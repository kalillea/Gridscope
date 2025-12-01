export type ComponentStatus = 'active' | 'inactive' | 'maintenance';

export type ComponentType = 'battery' | 'transformer' | 'station' | 'meter';

export interface EnergyComponent {
  id: string;
  name: string;
  status: ComponentStatus;
  type: ComponentType;
  lastUpdated: string;
}
