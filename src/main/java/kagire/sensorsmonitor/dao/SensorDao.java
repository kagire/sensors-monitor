package kagire.sensorsmonitor.dao;

import kagire.sensorsmonitor.entity.Sensor;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@Component
public class SensorDao {

    private final Session session;
    private final EntityManager entityManager;

    @Autowired
    SensorDao(SessionFactory sessionFactory){
        this.session = sessionFactory.openSession();
        this.entityManager = session.getEntityManagerFactory().createEntityManager();
    }

    public List<Sensor> findAll(){
        entityManager.clear();
        session.clear();
        return this.session.createQuery("FROM Sensor", Sensor.class).getResultList();
    }

    public Sensor findById(long id){
        return this.session.createQuery("FROM Sensor WHERE id = :id", Sensor.class)
                .setParameter("id", id)
                .getSingleResult();
    }

    public List<String> findSensorTypes(){
        Query query = entityManager.createNativeQuery("SELECT type FROM sensor_types");
        return query.getResultList();
    }

    public List<String> findSensorUnits(){
        Query query = entityManager.createNativeQuery("SELECT unit FROM sensor_units");
        return query.getResultList();
    }

    @Transactional
    public int createOrUpdateSensor(Sensor sensor, boolean isNew){
        Query query;
        if(isNew) {
            query = entityManager.createNativeQuery("INSERT INTO sensors (name, model, range_from, range_to, type," +
                    " unit, location, description) VALUES(:name, :model, :range_from, :range_to, :type," +
                    " :unit, :location, :description)");
        } else {
            query = entityManager.createNativeQuery("UPDATE sensors SET name = :name, model = :model," +
                    " range_from =  :range_from, range_to = :range_to, type = :type, unit = :unit, location = :location," +
                    "description = :description WHERE id = :id").setParameter("id", sensor.getId());
        }
            query.setParameter("name", sensor.getName())
                    .setParameter("model", sensor.getModel())
                    .setParameter("range_from", sensor.getRangeFrom())
                    .setParameter("range_to", sensor.getRangeTo())
                    .setParameter("type", sensor.getType())
                    .setParameter("unit", sensor.getUnit())
                    .setParameter("location", sensor.getLocation())
                    .setParameter("description", sensor.getDescription());
        entityManager.getTransaction().begin();
        int result = 0;
        try {
            result = query.executeUpdate();
        } catch (RuntimeException e) {
            entityManager.clear();
        }
        entityManager.getTransaction().commit();
        return result;
    }

    @Transactional
    public int deleteSensor(long id){
        entityManager.getTransaction().begin();
        int result = 0;
        try{
            result = entityManager.createNativeQuery("DELETE FROM sensors WHERE id = :id")
                .setParameter("id", id).executeUpdate();
        } catch (RuntimeException e) {
            entityManager.clear();
        }
        entityManager.getTransaction().commit();
        return result;
    }

    //this method is called by spring post-processor
    private void closeHibernateSession(){
        entityManager.close();
        session.close();
    }
}
