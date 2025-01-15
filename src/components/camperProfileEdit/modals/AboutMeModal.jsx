import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
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
                <Button variant="ghostNoHover" size="icon">
                    <Edit className="h-6 w-6 " />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto z-[9999] bg-[#0a0f2a]/95 border border-blue-500/30 backdrop-blur-lg text-blue-100 shadow-2xl shadow-blue-500/20 rounded-xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Editar Sobre Mí</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 p-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-blue-300">Sobre Mí</label>
                        <Textarea
                            name="about"
                            className="bg-blue-950/50 border-blue-500/30 text-blue-200 placeholder-blue-400/50 focus:border-yellow-400/50 focus:ring-yellow-400/20 transition-all min-h-[150px]"
                            value={formData.about}
                            onChange={handleChange}
                            placeholder="Cuéntanos sobre ti..."
                            maxLength={500}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-blue-300">URL del Video</label>
                        <Input
                            name="videoUrl"
                            className="bg-blue-950/50 border-blue-500/30 text-blue-200 placeholder-blue-400/50 focus:border-yellow-400/50 focus:ring-yellow-400/20 transition-all"
                            value={formData.videoUrl}
                            onChange={handleChange}
                            placeholder="URL del video de presentación"
                            type="url"
                        />
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                        <DialogTrigger asChild>
                            <Button variant="outline" className="text-blue-600 hover:bg-blue-900/30 hover:text-blue-200 transition-all border-blue-500/30">Cancelar</Button>
                        </DialogTrigger>
                        <Button type="submit" className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white border-0 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300">Guardar Cambios</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AboutMeModal;