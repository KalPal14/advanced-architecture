export class AlarmReadModel {
  id: string;
  name: string;
  severity: string;
  treggeredAt: Date;
  isAcknowledged: boolean;
  items: Array<{
    id: string;
    name: string;
    type: string;
  }>;
}
