export class CreateAlarmDto {
  name: string;
  severity: string;
  treggeredAt: Date;
  items: Array<{ name: string; type: string }>;
}
