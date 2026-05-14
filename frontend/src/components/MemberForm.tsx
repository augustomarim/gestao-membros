import { useEffect, forwardRef } from 'react';
import type { Member, MemberRequest } from '../types/Member';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useForm, Controller } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

interface CpfMaskProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const CpfMask = forwardRef<HTMLInputElement, CpfMaskProps>(function CpfMask(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="000.000.000-00"
      inputRef={ref}
      onAccept={(value: string) =>
        onChange({ target: { name: props.name, value } })
      }
      overwrite
    />
  );
});

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: MemberRequest) => void;
  member?: Member | null;
  errors?: string[];
}

export function MemberForm({ open, onClose, onSubmit, member, errors }: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm<MemberRequest>({
    defaultValues: {
      name: '',
      cpf: '',
      birthDate: '',
      active: true,
    },
  });

  useEffect(() => {
    if (member) {
      reset({
        name: member.name,
        cpf: member.cpf,
        birthDate: member.birthDate,
        active: member.active,
      });
    } else {
      reset({ name: '', cpf: '', birthDate: '', active: true });
    }
  }, [member, open, reset]);

  const handleFormSubmit = (data: MemberRequest) => {
    const cleanCpf = data.cpf.replace(/\D/g, '');
    onSubmit({ ...data, cpf: cleanCpf });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" fontWeight={700} sx={{ color: '#1a1a1a' }}>
          {member ? 'Editar Membro' : 'Novo Membro'}
        </Typography>
        <Typography variant="body2" sx={{ color: '#555', marginTop: '4px' }}>
          {member
            ? 'Atualize os dados do membro abaixo.'
            : 'Preencha os dados para cadastrar um novo membro.'}
        </Typography>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 8 }}>

          {errors && errors.length > 0 && (
            <Alert severity="error" variant="outlined">
              {errors.map((e, i) => (
                <div key={i}>{e}</div>
              ))}
            </Alert>
          )}

          <Controller
            name="name"
            control={control}
            rules={{ required: 'Nome é obrigatório' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nome completo"
                error={!!formErrors.name}
                helperText={formErrors.name?.message}
                fullWidth
                placeholder="Digite o nome completo"
              />
            )}
          />

          <Controller
            name="cpf"
            control={control}
            rules={{ required: 'CPF é obrigatório' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="CPF"
                error={!!formErrors.cpf}
                helperText={formErrors.cpf?.message}
                fullWidth
                placeholder="000.000.000-00"
                slotProps={{ input: { inputComponent: CpfMask as never } }}
              />
            )}
          />

          <Controller
            name="birthDate"
            control={control}
            rules={{ required: 'Data de nascimento é obrigatória' }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                <DatePicker
                  label="Data de Nascimento"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date ? date.format('YYYY-MM-DD') : '')}
                  maxDate={dayjs().subtract(18, 'year')}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!formErrors.birthDate,
                      helperText: formErrors.birthDate?.message,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />

          <Controller
            name="active"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    checked={field.value}
                    onChange={field.onChange}
                    color="primary"
                  />
                }
                label={field.value ? 'Membro ativo' : 'Membro inativo'}
              />
            )}
          />
        </div>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleSubmit(handleFormSubmit)}>
          {member ? 'Salvar alterações' : 'Cadastrar membro'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}