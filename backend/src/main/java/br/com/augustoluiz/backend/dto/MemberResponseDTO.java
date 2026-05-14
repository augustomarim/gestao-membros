package br.com.augustoluiz.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class MemberResponseDTO {
    private Long id;
    private String name;
    private String cpf;
    private LocalDate birthDate;
    private Boolean active;
}