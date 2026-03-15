package tnp_management.tnp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tnp_management.tnp.Entities.User;
import tnp_management.tnp.dto.StudentProfileDTO;
import tnp_management.tnp.services.StudentService;

@RestController
@RequestMapping("api/student")
public class StudentController {

    private final StudentService studentService;


    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PutMapping("/profile")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<StudentProfileDTO> updateMyProfile(Authentication authentication ,
                                                             @RequestBody StudentProfileDTO studentProfileDTO){
        User user = (User) authentication.getPrincipal();
         Long userId = user.getId();

        StudentProfileDTO updated = studentService.updateProfile(userId , studentProfileDTO);
        return ResponseEntity.ok(updated);
    }
}
