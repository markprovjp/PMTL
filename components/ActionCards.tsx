'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import { BookIcon, CompassIcon, UsersIcon, ArrowRightIcon } from "@/components/icons/ZenIcons";
import type { ActionCardItem } from "@/types/strapi";

// Map iconType string → actual icon component
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  book: BookIcon,
  compass: CompassIcon,
  users: UsersIcon,
}

interface ActionCardsProps {
  cards: ActionCardItem[]
}

const ActionCards = ({ cards }: ActionCardsProps) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link href={card.link} className="block">
                <div className="w-full text-left p-8 rounded-xl bg-card border border-border hover:border-gold-dim/40 transition-all duration-300 group shadow-elevated hover:shadow-gold">
                  {(() => { const Icon = iconMap[card.iconType] ?? BookIcon; return <Icon className="w-8 h-8 text-gold mb-5" />; })()}
                  <h3 className="font-display text-2xl text-foreground mb-3 group-hover:text-gold transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-5">
                    {card.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm text-gold-dim group-hover:text-gold transition-colors">
                    Khám phá <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActionCards;
