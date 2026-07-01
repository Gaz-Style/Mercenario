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
            viewport={{ margin: "-49% 0px -49% 0px" }} // Only active exactly in the center 2% of the screen
            className="relative w-full flex items-center group py-4 md:py-6"
        >
            {/* The Dot */}
            <motion.div 
                variants={{
                    inactive: { backgroundColor: "#d4d4d8", scale: 1 },
                    active: { backgroundColor: "#000000", scale: 1.5 }
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute left-6 md:left-12 w-1.5 h-1.5 rounded-full -translate-x-1/2 z-10"
            />

            {/* Single Column: Story */}
            <div className="pl-16 md:pl-28 pr-4 w-full">
                <motion.p 
                    variants={{
                        inactive: { color: "#d4d4d8" }, // CSS color transition is cheap if triggered discreetly
                        active: { color: "#000000" }
                    }}
                    transition={{ duration: 0.5 }}
                    className="text-base md:text-2xl font-light leading-snug"
                >
                    {stage.text}
                </motion.p>
            </div>
            
        </motion.div>
    );
}

export default function OperationMap() {
    return (
        <section className="w-full bg-white pb-32 md:pb-48 pt-8 md:pt-16 font-sans selection:bg-black selection:text-white">
            <div className="max-w-5xl mx-auto px-4 md:px-8">
                
                {/* Track Container */}
                <div className="relative w-full flex flex-col">
                    
                    {/* The Thin Vertical Line */}
                    <div className="absolute top-0 bottom-0 left-6 md:left-12 w-[1px] bg-neutral-100 -translate-x-1/2" />

                    {/* The Stations (Driven purely by IntersectionObserver) */}
                    {STAGES.map((stage, i) => (
                        <StationRow key={i} stage={stage} />
                    ))}
                </div>
                
                {/* Conclusion */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20% 0px" }}
                    transition={{ duration: 0.8 }}
                    className="mt-24 md:mt-32 max-w-3xl mx-auto text-center px-4"
                >
                    <p className="text-2xl md:text-4xl font-semibold tracking-tight text-black leading-snug">
                        Desde la reserva hasta la reseña final, toda la operación se ejecutó en segundo plano sin que tocaras un solo botón.
                    </p>
                </motion.div>
                
            </div>
        </section>
    );
}
