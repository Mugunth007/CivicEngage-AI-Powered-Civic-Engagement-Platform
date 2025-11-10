
import React, { useState, useEffect } from 'react';
import { getProjects } from '../../services/blockchainService';
import { Project } from '../../types';
import Card from '../ui/Card';
import Spinner from '../ui/Spinner';

const statusColors: { [key: string]: string } = {
    planning: 'bg-yellow-100 text-yellow-800',
    ongoing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    'on-hold': 'bg-red-100 text-red-800'
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const progress = (project.spent / project.budget) * 100;

    return (
        <Card>
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-slate-800">{project.name}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[project.status]}`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                </span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{project.description}</p>
            <div className="mt-4">
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                    <span>${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</span>
                    <span>{progress.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
            <div className="mt-4 text-xs text-slate-400 truncate">
                Tx: <a href="#" className="hover:underline">{project.transactionHash}</a>
            </div>
        </Card>
    );
};

const TrackerPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true);
            const data = await getProjects();
            setProjects(data);
            setIsLoading(false);
        };
        fetchProjects();
    }, []);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Fund & Project Tracker</h1>
                <p className="mt-2 text-slate-600">Transparently monitor public initiatives and their funding status.</p>
            </div>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TrackerPage;
