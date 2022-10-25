package kagire.sensorsmonitor.dto;

import kagire.sensorsmonitor.entity.Sensor;

import java.util.List;

public class SensorDto {

    private Sensor sensor;
    private List<String> sensorTypes;
    private List<String> sensorUnits;

    public SensorDto(Sensor sensor, List<String> sensorTypes, List<String> sensorUnits) {
        this.sensor = sensor;
        this.sensorTypes = sensorTypes;
        this.sensorUnits = sensorUnits;
    }

    public Sensor getSensor() {
        return sensor;
    }

    public void setSensor(Sensor sensor) {
        this.sensor = sensor;
    }

    public List<String> getSensorTypes() {
        return sensorTypes;
    }

    public void setSensorTypes(List<String> sensorTypes) {
        this.sensorTypes = sensorTypes;
    }

    public List<String> getSensorUnits() {
        return sensorUnits;
    }

    public void setSensorUnits(List<String> sensorUnits) {
        this.sensorUnits = sensorUnits;
    }
}
