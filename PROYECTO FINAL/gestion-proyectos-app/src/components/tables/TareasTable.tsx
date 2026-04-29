import { Trash2, ClipboardList } from 'lucide-react';
import { Tarea } from '../../interfaces/Tarea';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import EmptyState from '../ui/EmptyState';

interface Props {
  tareas: Tarea[];
  loading: boolean;
  onEliminar: (id: number) => void;
}

export default function TareasTable({ tareas, loading, onEliminar }: Props) {
  if (loading) return <div className="text-center py-12 text-slate-400 animate-pulse">Cargando tareas...</div>;
  if (!tareas.length) return <EmptyState icon={ClipboardList} title="Sin tareas" description="Crea la primera tarea y asígnala a un usuario." />;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-600 font-semibold">
          <tr>
            <th className="text-left px-5 py-3">#</th>
            <th className="text-left px-5 py-3">Título</th>
            <th className="text-left px-5 py-3">Estado</th>
            <th className="text-left px-5 py-3">Proyecto</th>
            <th className="text-left px-5 py-3">Asignado a</th>
            <th className="text-left px-5 py-3">Creado</th>
            <th className="text-left px-5 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tareas.map((t) => (
            <tr key={t.id} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors">
              <td className="px-5 py-3 text-slate-400">{t.id}</td>
              <td className="px-5 py-3 font-medium text-slate-800">{t.titulo}</td>
              <td className="px-5 py-3"><Badge estado={t.estado} /></td>
              <td className="px-5 py-3 text-slate-600">{t.proyecto?.nombre || `ID: ${t.proyectoId}`}</td>
              <td className="px-5 py-3 text-slate-500">{t.usuario?.nombre || <span className="text-slate-300 italic">Sin asignar</span>}</td>
              <td className="px-5 py-3 text-slate-400">{new Date(t.creadoEn).toLocaleDateString('es-BO')}</td>
              <td className="px-5 py-3">
                <Button variant="danger" onClick={() => onEliminar(t.id)} icon={<Trash2 size={14} />}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}