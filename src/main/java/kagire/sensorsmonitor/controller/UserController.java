package kagire.sensorsmonitor.controller;

import kagire.sensorsmonitor.dao.CustomUserDao;
import kagire.sensorsmonitor.entity.user.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class UserController {

    CustomUserDao customUserDao;

    @Autowired
    public UserController(CustomUserDao customUserDao) {
        this.customUserDao = customUserDao;
    }

    @GetMapping("/login")
    public ResponseEntity<String> login(Authentication authentication) {
        if (authentication.isAuthenticated()){
            CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();
            return new ResponseEntity<>(user.getUser().getRole().toString(), HttpStatus.OK);
        } else return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}
