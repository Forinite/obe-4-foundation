// app/admin/dashboard/Home/HomeSection.tsx


'use client';

import React, { useState } from 'react';
import { useHomeData } from '@/app/hooks/useHomeData';
import MissionStatementCard from '@/app/(components)/adminComponents/Home/MissionStatementCard';
import MissionInfoCard from '@/app/(components)/adminComponents/Home/MissionInfoCard';
import ServiceCard from '@/app/(components)/adminComponents/Home/ServiceCard';
import AddMissionStatementModal from '@/app/(components)/adminComponents/Home/modals/AddMissionStatementModal';
import AddServiceModal from '@/app/(components)/adminComponents/Home/modals/AddServiceModal';
import EditMissionStatementModal from '@/app/(components)/adminComponents/Home/modals/EditMissionStatementModal';
import EditServiceModal from '@/app/(components)/adminComponents/Home/modals/EditServiceModal';
import EditMissionInfoModal from '@/app/(components)/adminComponents/Home/modals/EditMissionInfoModal';
import { Plus, RefreshCw, Info } from 'lucide-react';
import {
    addMissionStatement, deleteMissionStatement,
    addService, deleteService,
    updateMissionInfo
} from '@/app/actions/home';
import UpdateVisionStatementModal from "@/app/(components)/adminComponents/Home/modals/UpdateVisionStatementModal";
import VisionStatementCard from "@/app/(components)/adminComponents/Home/VisionStatementCard";

export default function HomeSection() {
    const { data, loading, error, refetch } = useHomeData();

    // 🔥 ADD MODALS
    const [showMissionModal, setShowMissionModal] = useState(false);
    const [showServiceModal, setShowServiceModal] = useState(false);

    // 🔥 EDIT MODALS
    const [showEditMissionModal, setShowEditMissionModal] = useState(false);
    const [editMissionIndex, setEditMissionIndex] = useState(-1);
    const [editMissionStatement, setEditMissionStatement] = useState('');

    const [showEditServiceModal, setShowEditServiceModal] = useState(false);
    const [editServiceIndex, setEditServiceIndex] = useState(-1);
    const [editServiceData, setEditServiceData] = useState({ icon: '', title: '', description: '' });

    const [showEditMissionInfoModal, setShowEditMissionInfoModal] = useState(false);

    // 🔥 DELETE MODALS
    const [showDeleteServiceModal, setShowDeleteServiceModal] = useState(false);
    const [deleteServiceIndex, setDeleteServiceIndex] = useState(-1);

    const [showDeleteMissionModal, setShowDeleteMissionModal] = useState(false);
    const [deleteMissionIndex, setDeleteMissionIndex] = useState(-1);

    const [showDeleteMissionInfoModal, setShowDeleteMissionInfoModal] = useState(false);
    const [showEditVisionModal, setShowEditVisionModal] = useState(false);

    const handleSuccess = () => {
        refetch();
    };

    // 🔥 ADD CALLBACKS
    const openAddMission = () => setShowMissionModal(true);
    const openAddService = () => setShowServiceModal(true);

    // 🔥 EDIT CALLBACKS
    const openEditMission = (index: number, statement: string) => {
        console.log('🚀 DEBUG:', index, statement);  // 🔥 ADD THIS
        setEditMissionIndex(index);
        setEditMissionStatement(statement);
        setShowEditMissionModal(true);
    };

    const openEditService = (index: number, service: any) => {
        setEditServiceIndex(index);
        setEditServiceData(service);
        setShowEditServiceModal(true);
    };

    const openEditMissionInfo = () => {
        setShowEditMissionInfoModal(true);
    };

    // 🔥 DELETE CALLBACKS
    const openDeleteService = (index: number) => {
        setDeleteServiceIndex(index);
        setShowDeleteServiceModal(true);
    };

    const openDeleteMission = (index: number) => {
        setDeleteMissionIndex(index);
        setShowDeleteMissionModal(true);
    };

    const openDeleteMissionInfo = () => {
        setShowDeleteMissionInfoModal(true);
    };

    if (loading) return <div className="p-6 text-center">Loading...</div>;
    if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;
    if (!data) return <div className="p-6 text-center">No data</div>;

    console.log(data.visionStatement)
    return (
        <>
            <div className="space-y-12 animate-fadeIn max-w-screen">
                {/* 🔥 MISSION STATEMENTS */}
                <section className="p-6 bg-white/80 dark:bg-gray-900/50 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300">
                    <div className="flex md:flex-row flex-col items-center justify-between mb-5">
                        <h3 className="md:text-2xl text-lg font-semibold text-gray-800 dark:text-gray-100">
                            Mission Statements
                        </h3>
                        <button
                            onClick={openAddMission}
                            className="flex items-center justify-center md:w-fit w-[60%] gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 px-3 py-1.5 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 hover:shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            Add
                        </button>
                    </div>
                    {data.missionStatements?.length > 0 ? (
                        <div className="space-y-4 text-sm">
                            {data.missionStatements.map((statement, index) => (
                                <MissionStatementCard
                                    key={index}
                                    statement={statement}
                                    index={index}
                                    onEdit={() => openEditMission(index, statement)}
                                    onDelete={() => openDeleteMission(index)}
                                    onRefetch={handleSuccess}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 italic flex items-center gap-2">
                            <Info className="w-4 h-4 text-cyan-400" />
                            No mission statements found.
                        </p>
                    )}
                </section>

                {/* 🔥 MISSION INFO */}
                <section className="p-6 bg-white/80 dark:bg-gray-900/50 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                            Mission Info
                        </h3>
                    </div>
                    {data.missionInfo ? (
                        <MissionInfoCard
                            data={data.missionInfo}
                            onEdit={openEditMissionInfo}
                            onDelete={openDeleteMissionInfo}
                            onRefetch={handleSuccess}
                        />
                    ) : (
                        <p className="text-gray-500 italic flex items-center gap-2">
                            <Info className="w-4 h-4 text-cyan-400" />
                            No mission info available.
                        </p>
                    )}
                </section>

                {/*vision section*/}
                <VisionStatementCard
                    data={data?.visionStatement}
                    onEdit={() => setShowEditVisionModal(true)}
                />


                {/* 🔥 SERVICES */}
                <section className="p-6 bg-white/80 dark:bg-gray-900/50 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className=" text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100">
                            Services
                        </h3>
                        <button
                            onClick={openAddService}
                            className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 px-3 py-1.5 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 hover:shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            Add
                        </button>
                    </div>
                    {data.services?.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.services.map((service, index) => (
                                <ServiceCard
                                    key={index}
                                    service={service}
                                    index={index}
                                    onEdit={() => openEditService(index, service)}
                                    onDelete={() => openDeleteService(index)}
                                    onRefetch={handleSuccess}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 italic flex items-center gap-2">
                            <Info className="w-4 h-4 text-cyan-400" />
                            No services listed yet.
                        </p>
                    )}
                </section>
            </div>

            {/* 🔥 ALL 9 MODALS RENDER HERE = PERFECT POSITIONING! */}

            {/* ADD MODALS */}
            <AddMissionStatementModal
                isOpen={showMissionModal}
                onClose={() => setShowMissionModal(false)}
                onSuccess={handleSuccess}
            />
            <AddServiceModal
                isOpen={showServiceModal}
                onClose={() => setShowServiceModal(false)}
                onSuccess={handleSuccess}
            />

            {/* EDIT MODALS */}
            <EditMissionStatementModal
                isOpen={showEditMissionModal}
                onClose={() => setShowEditMissionModal(false)}
                index={editMissionIndex}
                initialStatement={editMissionStatement}
                onSuccess={handleSuccess}
            />
            <EditServiceModal
                isOpen={showEditServiceModal}
                onClose={() => setShowEditServiceModal(false)}
                index={editServiceIndex}
                initialService={editServiceData}
                onSuccess={handleSuccess}
            />
            <EditMissionInfoModal
                isOpen={showEditMissionInfoModal}
                onClose={() => setShowEditMissionInfoModal(false)}
                initialData={data.missionInfo!}
                onSuccess={handleSuccess}
            />

            <UpdateVisionStatementModal
                isOpen={showEditVisionModal}
                onClose={() => setShowEditVisionModal(false)}
                existingData={data.visionStatement}
                onSuccess={handleSuccess}
            />


            {/* 🔥 DELETE MODALS */}
            {showDeleteServiceModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Delete Service?</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={async () => {
                                    await deleteService(deleteServiceIndex);
                                    handleSuccess();
                                    setShowDeleteServiceModal(false);
                                }}
                                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setShowDeleteServiceModal(false)}
                                className="flex-1 bg-gray-300 dark:bg-gray-600 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteMissionModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Delete Mission Statement?</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={async () => {
                                    await deleteMissionStatement(deleteMissionIndex);
                                    handleSuccess();
                                    setShowDeleteMissionModal(false);
                                }}
                                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setShowDeleteMissionModal(false)}
                                className="flex-1 bg-gray-300 dark:bg-gray-600 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteMissionInfoModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Delete Mission Info?</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={async () => {
                                    const emptyInfo = { percentage: 0, text: '', list: [] };
                                    await updateMissionInfo(emptyInfo);
                                    handleSuccess();
                                    setShowDeleteMissionInfoModal(false);
                                }}
                                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setShowDeleteMissionInfoModal(false)}
                                className="flex-1 bg-gray-300 dark:bg-gray-600 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}