import type { Member } from '../types/Member';
import {
  Button,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  members: Member[];
  onEdit: (member: Member) => void;
  onDelete: (member: Member) => void;
  onNew: () => void;
}

export function MemberList({ members, onEdit, onDelete, onNew }: Props) {
  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
        gap: 16,
      }}>
        <div>
          <Typography variant="h5" color="primary.dark">
            Gestão de Membros
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ marginTop: 4 }}>
            {members.length === 0
              ? 'Nenhum membro cadastrado'
              : `${members.length} membro${members.length > 1 ? 's' : ''} cadastrado${members.length > 1 ? 's' : ''}`}
          </Typography>
        </div>
        <Button variant="contained" onClick={onNew} startIcon={<AddIcon />}>
          Novo Membro
        </Button>
      </div>

      {/* Empty state */}
      {members.length === 0 ? (
        <Paper elevation={0} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '72px 32px',
          gap: 12,
          border: '2px dashed #C5D5EA',
          background: '#F7FAFF',
        }}>
          <PeopleAltOutlinedIcon sx={{ fontSize: 56, color: '#90AAC8' }} />
          <Typography variant="h6" color="text.secondary" fontWeight={600}>
            Nenhum membro cadastrado
          </Typography>
          <Typography variant="body2" color="text.disabled">
            Clique em "Novo Membro" para começar.
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: 'linear-gradient(135deg, #1565C0 0%, #0288D1 100%)' }}>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Nome</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>CPF</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Nascimento</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }} align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((m, index) => (
                <TableRow
                  key={m.id}
                  hover
                  sx={{ backgroundColor: index % 2 === 0 ? 'white' : '#F7FAFF' }}
                >
                  <TableCell sx={{ fontWeight: 500 }}>{m.name}</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace', letterSpacing: 1 }}>{m.cpf}</TableCell>
                  <TableCell>
                    {new Date(m.birthDate + 'T00:00:00').toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={m.active ? 'Ativo' : 'Inativo'}
                      color={m.active ? 'success' : 'default'}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Editar">
                      <IconButton onClick={() => onEdit(m)} size="small" color="primary">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton onClick={() => onDelete(m)} size="small" color="error">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}