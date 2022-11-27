export class Sensor {
  id: number;
  name: string;
  model: string;
  rangeFrom: string | null;
  rangeTo: string | null;
  type: string;
  unit: string;
  location: string | null;
  description: string | null;

  constructor(id: number, name: string, model: string, rangeFrom: string | null, rangeTo: string | null,
              type: string, unit: string, location: string | null, description: string | null) {
    this.id = id;
    this.name = name;
    this.model = model;
    this.rangeFrom = rangeFrom;
    this.rangeTo = rangeTo;
    this.type = type;
    this.unit = unit;
    this.location = location;
    this.description = description;
  }
}
