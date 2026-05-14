package br.com.augustoluiz.backend.repository;

import br.com.augustoluiz.backend.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    boolean existsByCpf(String cpf);
    Optional<Member> findByCpf(String cpf);
}