import { useEffect, useState, useCallback } from 'react';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import type { Member, MemberRequest } from '../types/Member';
import { memberService } from '../api/memberService';
import { MemberList } from '../components/MemberList';
import { MemberForm } from '../components/MemberForm';
import { ConfirmDialog } from '../components/ConfirmDialog';

type SnackbarState = { open: boolean; message: string; severity: 'success' | 'error' };

export function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [selected, setSelected] = useState<Member | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Member | null>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false, message: '', severity: 'success'
  });

  const showSnackbar = useCallback((message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const load = useCallback(async () => {
    try {
      const data = await memberService.findAll();
      setMembers(data);
    } catch {
      showSnackbar('Erro ao carregar membros', 'error');
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  useEffect(() => { load(); }, [load]);

  const handleNew = () => {
    setSelected(null);
    setFormErrors([]);
    setFormOpen(true);
  };

  const handleEdit = (member: Member) => {
    setSelected(member);
    setFormErrors([]);
    setFormOpen(true);
  };

  const handleSubmit = async (data: MemberRequest) => {
    try {
      if (selected) {
        await memberService.update(selected.id, data);
        showSnackbar('Membro atualizado com sucesso!', 'success');
      } else {
        await memberService.create(data);
        showSnackbar('Membro cadastrado com sucesso!', 'success');
      }
      setFormOpen(false);
      load();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { messages?: string[] } } };
      const messages = error.response?.data?.messages;
      if (messages?.length) {
        setFormErrors(messages);
      } else {
        setFormErrors(['Erro ao salvar membro.']);
      }
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await memberService.delete(deleteTarget.id);
      showSnackbar('Membro excluído com sucesso!', 'success');
      load();
    } catch {
      showSnackbar('Erro ao excluir membro.', 'error');
    } finally {
      setDeleteTarget(null);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 80 }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', marginTop: 40, padding: '0 24px' }}>
      <MemberList
        members={members}
        onNew={handleNew}
        onEdit={handleEdit}
        onDelete={setDeleteTarget}
      />

      <MemberForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        member={selected}
        errors={formErrors}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Excluir Membro"
        message={`Deseja excluir o membro "${deleteTarget?.name}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}