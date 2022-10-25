package kagire.sensorsmonitor.entity;

import kagire.sensorsmonitor.exception.InvalidRangeException;

import javax.persistence.*;

@Entity
@Table(name = "sensors")
public class Sensor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String model;
    @Column(name = "range_from")
    private int rangeFrom;
    @Column(name = "range_to")
    private int rangeTo;
    private String type;
    private String unit;
    private String location;
    private String description;

    public Sensor() {
        this.name = "";
        this.model = "";
        this.rangeTo = 1;
        this.type = "";
        this.unit = "";
    }

    public Sensor(String name, String model, int rangeFrom, int rangeTo, String type, String unit, String location,
                  String description) throws InvalidRangeException {
        if (rangeTo < rangeFrom) throw new InvalidRangeException("Upper border must be more then lower border");
        this.name = name;
        this.model = model;
        this.rangeFrom = rangeFrom;
        this.rangeTo = rangeTo;
        this.type = type;
        this.unit = unit;
        this.location = location;
        this.description = description;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getRangeFrom() {
        return rangeFrom;
    }

    public void setRangeFrom(int rangeFrom) {
        this.rangeFrom = rangeFrom;
    }

    public int getRangeTo() {
        return rangeTo;
    }

    public void setRangeTo(int rangeTo) {
        this.rangeTo = rangeTo;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
