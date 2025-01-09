import React, { useEffect, useState } from 'react';
import { 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Edit } from 'lucide-react';

const AboutMeModal = ({ initialData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
    about: initialData?.about || '',
    videoUrl: initialData?.videoUrl || ''
    });

    useEffect(() => {
    const navbar = document.querySelector('.navbar-profile');
    if (navbar) {
        navbar.classList.toggle('navbar-hidden', isOpen);
    }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(false);
    };

return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
                <Edit className="h-6 w-6" />
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto z-[9999] bg-white text-gray-800">
        <DialogHeader>
            <DialogTitle className="text-gray-900">Editar Sobre Mí</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Sobre Mí</label>
                <Textarea
                    name="about"
                    className="text-gray-900 bg-gray-50 min-h-[150px]"
                    value={formData.about}
                    onChange={handleChange}
                    placeholder="Cuéntanos sobre ti..."
                    maxLength={500}
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">URL del Video</label>
                <Input
                    name="videoUrl"
                    className="text-gray-900 bg-gray-50"
                    value={formData.videoUrl}
                    onChange={handleChange}
                    placeholder="URL del video de presentación"
                    type="url"
                />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
                <DialogTrigger asChild>
                    <Button variant="outline">Cancelar</Button>
                </DialogTrigger>
                <Button type="submit">Guardar Cambios</Button>
            </div>
        </form>
        </DialogContent>
    </Dialog>
    );
};

export default AboutMeModal;