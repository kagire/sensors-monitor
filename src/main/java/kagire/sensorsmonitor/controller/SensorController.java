package kagire.sensorsmonitor.controller;

import kagire.sensorsmonitor.dao.SensorDao;
import kagire.sensorsmonitor.dto.SensorDto;
import kagire.sensorsmonitor.entity.Sensor;
import kagire.sensorsmonitor.entity.user.CustomUserDetails;
import kagire.sensorsmonitor.exception.UserAccessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("sensors")
public class SensorController {

    SensorDao sensorDao;

    @Autowired
    SensorController(SensorDao sensorDao) {
        this.sensorDao = sensorDao;
    }

    @GetMapping
    public List<Sensor> getSensors() {
        return sensorDao.findAll();
    }

    @GetMapping("modify")
    public SensorDto setUpSensorForCreation(@RequestParam("sensor") String sensorId, Authentication authentication) {
        checkAdministratorRights(authentication);
        Sensor sensor = new Sensor();
        if (sensorId.equals("new")) {
            sensor.setType(sensorDao.findSensorTypes().get(0));
            sensor.setUnit(sensorDao.findSensorUnits().get(0));
        } else {
            sensor = sensorDao.findById(Long.parseLong(sensorId));
        }
        return new SensorDto(sensor, sensorDao.findSensorTypes(), sensorDao.findSensorUnits());
    }

    @PostMapping("modify")
    public ResponseEntity<String> createOrEditSensor(@RequestBody Sensor sensor, Authentication authentication){
        checkAdministratorRights(authentication);
        return sensorDao.createOrUpdateSensor(sensor, sensor.getId() == 0) > 0 ?
                new ResponseEntity<>(HttpStatus.CREATED) : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("modify")
    public ResponseEntity<String> deleteSensor(@RequestParam("sensorId") long id, Authentication authentication){
        checkAdministratorRights(authentication);
        return sensorDao.deleteSensor(id) > 0 ?
                new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    private void checkAdministratorRights(Authentication authentication){
        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();
        if (!user.getUser().getRole().toString().equals("ADMINISTRATOR")) throw new UserAccessException("You have no access");
    }
}
