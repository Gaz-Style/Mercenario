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
            viewport={{ margin: "-45% 0px -45% 0px" }} // Only active exactly in the center 10% of the screen
            className="relative w-full flex items-center group py-8 md:py-12"
        >
            {/* The Dot */}
            <motion.div 
                variants={{
                    inactive: { backgroundColor: "#d4d4d8", scale: 1 },
                    active: { backgroundColor: "#000000", scale: 2.5 }
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
                    className="text-lg md:text-3xl font-light leading-snug"
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
                
            </div>
        </section>
    );
}
