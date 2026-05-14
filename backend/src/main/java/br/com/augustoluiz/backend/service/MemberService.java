package br.com.augustoluiz.backend.service;

import br.com.augustoluiz.backend.dto.MemberRequestDTO;
import br.com.augustoluiz.backend.dto.MemberResponseDTO;
import br.com.augustoluiz.backend.entity.Member;
import br.com.augustoluiz.backend.exception.BusinessException;
import br.com.augustoluiz.backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository repository;

    public MemberResponseDTO create(MemberRequestDTO dto) {
        String cleanCpf = dto.getCpf().replaceAll("[^0-9]", "");

        validateAge(dto.getBirthDate());
        validateCpf(cleanCpf);

        if (repository.existsByCpf(cleanCpf)) {
            throw new BusinessException("CPF já cadastrado no sistema", HttpStatus.CONFLICT);
        }

        Member member = Member.builder()
                .name(dto.getName())
                .cpf(cleanCpf)
                .birthDate(dto.getBirthDate())
                .active(dto.getActive())
                .build();

        return toResponse(repository.save(member));
    }

    public List<MemberResponseDTO> findAll() {
        return repository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public MemberResponseDTO findById(Long id) {
        return repository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new BusinessException("Membro não encontrado", HttpStatus.NOT_FOUND));
    }

    public MemberResponseDTO update(Long id, MemberRequestDTO dto) {
        Member member = repository.findById(id)
                .orElseThrow(() -> new BusinessException("Membro não encontrado", HttpStatus.NOT_FOUND));

        String cleanCpf = dto.getCpf().replaceAll("[^0-9]", "");

        validateAge(dto.getBirthDate());
        validateCpf(cleanCpf);

        if (!member.getCpf().equals(cleanCpf) && repository.existsByCpf(cleanCpf)) {
            throw new BusinessException("CPF já cadastrado no sistema", HttpStatus.CONFLICT);
        }

        member.setName(dto.getName());
        member.setCpf(cleanCpf);
        member.setBirthDate(dto.getBirthDate());
        member.setActive(dto.getActive());

        return toResponse(repository.save(member));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new BusinessException("Membro não encontrado", HttpStatus.NOT_FOUND);
        }
        repository.deleteById(id);
    }

    private void validateAge(LocalDate birthDate) {
        int age = Period.between(birthDate, LocalDate.now()).getYears();
        if (age < 18) {
            throw new BusinessException("Membro deve ter pelo menos 18 anos", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    private void validateCpf(String cpf) {
        if (!isCpfValid(cpf)) {
            throw new BusinessException("CPF inválido", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    private boolean isCpfValid(String cpf) {
        if (cpf == null || cpf.length() != 11) return false;
        if (cpf.chars().distinct().count() == 1) return false;

        int[] digits = cpf.chars().map(c -> c - '0').toArray();

        int sum = 0;
        for (int i = 0; i < 9; i++) sum += digits[i] * (10 - i);
        int first = 11 - (sum % 11);
        if (first >= 10) first = 0;
        if (first != digits[9]) return false;

        sum = 0;
        for (int i = 0; i < 10; i++) sum += digits[i] * (11 - i);
        int second = 11 - (sum % 11);
        if (second >= 10) second = 0;

        return second == digits[10];
    }

    private MemberResponseDTO toResponse(Member member) {
        String formatted = member.getCpf().replaceAll(
                "(\\d{3})(\\d{3})(\\d{3})(\\d{2})", "$1.$2.$3-$4"
        );
        return MemberResponseDTO.builder()
                .id(member.getId())
                .name(member.getName())
                .cpf(formatted)
                .birthDate(member.getBirthDate())
                .active(member.getActive())
                .build();
    }
}