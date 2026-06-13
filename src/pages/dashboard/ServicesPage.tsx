import { useState } from 'react';
import { ServicesTable } from '../../components/dashboard/ServicesTable';
import { ServiceFormModal } from '../../components/dashboard/ServiceFormModal';
import { Button } from '../../components/ui/Button';
import { useServices } from '../../hooks/useServices';
import type { Service } from '../../types/service';

export function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editService, setEditService] = useState<Service | null>(null);
  const { deleteService } = useServices();

  function handleEdit(service: Service) {
    setEditService(service);
    setModalOpen(true);
  }

  function handleCreate() {
    setEditService(null);
    setModalOpen(true);
  }

  async function handleDelete(service: Service) {
    if (window.confirm(`Delete service "${service.title}"?`)) {
      await deleteService(service.id);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">Services</h1>
          <p className="text-sm text-navy-400 mt-1">Manage your service offerings</p>
        </div>
        <Button onClick={handleCreate}>+ New Service</Button>
      </div>

      <ServicesTable onEdit={handleEdit} onDelete={handleDelete} />

      <ServiceFormModal
        key={modalOpen ? `service-${editService?.id ?? 'new'}` : 'closed'}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        editService={editService}
      />
    </div>
  );
}
