export class CreateAlarmCommand {
  constructor(
    public readonly name: string,
    public readonly severity: string,
    public readonly treggeredAt: Date,
    public readonly items: Array<{ name: string; type: string }>,
  ) {}
}
