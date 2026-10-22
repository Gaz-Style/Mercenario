import { motion } from "framer-motion";

const STAGES = [
    { text: "Un cliente agenda una cita.", cap: "Agenda" },
    { text: "Recibe la confirmación por correo.", cap: "Correo" },
    { text: "Realiza el pago.", cap: "Pago" },
    { text: "Recibe el comprobante de pago.", cap: "Correo" },
    { text: "Antes de su cita recibe un recordatorio por WhatsApp.", cap: "WhatsApp" },
    { text: "Después de la atención recibe una solicitud de reseña.", cap: "Correo" },
];

function StationRow({ stage }: { stage: typeof STAGES[0] }) {
    return (
        <motion.div 
            initial="inactive"
            whileInView="active"
            viewport={{ margin: "-20% 0px -20% 0px" }} // Activación fluida en móviles y desktop
            className="relative w-full flex items-center group py-3 md:py-6"
        >
            {/* The Dot */}
            <motion.div 
                variants={{
                    inactive: { backgroundColor: "#d4d4d8", scale: 1 },
                    active: { backgroundColor: "#000000", scale: 1.4 }
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute left-4 sm:left-6 md:left-12 w-2 h-2 rounded-full -translate-x-1/2 z-10"
            />

            {/* Single Column: Story */}
            <div className="pl-10 sm:pl-16 md:pl-28 pr-2 sm:pr-4 w-full">
                <motion.p 
                    variants={{
                        inactive: { color: "#a1a1aa" },
                        active: { color: "#000000" }
                    }}
                    transition={{ duration: 0.4 }}
                    className="text-sm sm:text-base md:text-2xl font-light leading-snug"
                >
                    {stage.text}
                </motion.p>
            </div>
            
        </motion.div>
    );
}

export default function OperationMap() {
    return (
        <section className="w-full bg-white pb-14 md:pb-24 pt-6 md:pt-16 font-sans selection:bg-black selection:text-white">
            <div className="max-w-5xl mx-auto px-4 md:px-8">
                
                {/* Track Container */}
                <div className="relative w-full flex flex-col">
                    
                    {/* The Thin Vertical Line */}
                    <div className="absolute top-0 bottom-0 left-4 sm:left-6 md:left-12 w-[1px] bg-neutral-200 -translate-x-1/2" />

                    {/* The Stations (Driven purely by IntersectionObserver) */}
                    {STAGES.map((stage, i) => (
                        <StationRow key={i} stage={stage} />
                    ))}
                </div>
                
                {/* Conclusion */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.6 }}
                    className="mt-6 md:mt-12 max-w-3xl text-left pl-10 sm:pl-16 md:pl-28 pr-2 sm:pr-4"
                >
                    <p className="text-sm sm:text-base md:text-xl font-light text-neutral-500 leading-relaxed max-w-2xl">
                        Desde la reserva hasta la reseña final, toda la operación se ejecutó en segundo plano <span className="font-semibold text-black">sin que tocaras un solo botón.</span>
                    </p>
                </motion.div>
                
            </div>
        </section>
    );
}
