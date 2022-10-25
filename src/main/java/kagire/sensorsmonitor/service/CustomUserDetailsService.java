package kagire.sensorsmonitor.service;

import kagire.sensorsmonitor.dao.CustomUserDao;
import kagire.sensorsmonitor.entity.user.CustomUser;
import kagire.sensorsmonitor.entity.user.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    CustomUserDao customUserDao;

    @Override
    public UserDetails loadUserByUsername(String username) {
        CustomUser user = customUserDao.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        return new CustomUserDetails(user);
    }
}
