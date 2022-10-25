package kagire.sensorsmonitor.dao;

import kagire.sensorsmonitor.entity.user.CustomUser;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CustomUserDao{

    private SessionFactory sessionFactory;

    @Autowired
    CustomUserDao(SessionFactory sessionFactory){
        this.sessionFactory = sessionFactory;
    }

    public CustomUser findByUsername(String username){
        Session session = sessionFactory.openSession();
        CustomUser customUser = session.createQuery("from CustomUser u where u.username = :username", CustomUser.class)
                .setParameter("username", username).getSingleResult();
        session.disconnect();
        return customUser;
    }
}
