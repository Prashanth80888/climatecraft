import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function BrandStatement() {
  return (
    <section className="relative isolate overflow-hidden bg-transparent py-14 sm:py-16 lg:py-20">
      {/* =========================================================
          AMBIENT BACKGROUND
      ========================================================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-[5%] top-[15%] h-[420px] w-[420px] rounded-full bg-[#73d7d0]/20 blur-[110px]" />

        <div className="absolute right-[4%] top-[4%] h-[520px] w-[520px] rounded-full bg-[#d7efe9]/60 blur-[120px]" />

        <div className="absolute bottom-[-18%] left-[25%] h-[560px] w-[560px] rounded-full bg-[#55c9c4]/15 blur-[120px]" />

        <div className="absolute inset-x-0 top-0 h-px bg-white/70" />
      </div>

      {/* =========================================================
          MASTER CONTENT CONTAINER

          Wide enough to use the available space, but still safely
          contained inside the navbar's visual boundaries.
      ========================================================= */}
      <div className="mx-auto w-full max-w-[1250px] px-5 sm:px-7 lg:px-8 xl:px-0">
        <div className="grid w-full grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-12 xl:gap-14">
          {/* =======================================================
              LEFT SIDE
          ======================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="min-w-0 w-full"
          >
            {/* Section label */}
            <div className="flex items-center gap-3">
              <span className="h-px w-10 shrink-0 bg-[#b18a2d]" />

              <span className="h-px w-5 shrink-0 bg-[#1aa8a8]" />

              <span className="ml-1 text-[9px] font-bold uppercase tracking-[0.23em] text-[#245d63] sm:text-[10px]">
                Why ClimateCraft Exists
              </span>
            </div>

            {/* Left content */}
            <div className="mt-8 max-w-[520px] space-y-7 sm:mt-9 sm:space-y-8">
              <p className="text-[17px] font-medium leading-[1.75] text-[#245d63] sm:text-[19px] lg:text-[20px]">
                Traditional furniture is designed primarily to support the
                body. But comfort is more than posture.
              </p>

              <p className="text-[16px] font-medium leading-[1.78] text-[#245d63] sm:text-[18px] lg:text-[19px]">
                When temperatures rise, the areas where your body remains in
                contact with a chair can become uncomfortable. In colder
                conditions, the same surfaces can feel unpleasantly cold.
              </p>
            </div>

            {/* Supporting label */}
            <div className="mt-10 flex items-center gap-3 sm:mt-11">
              <span className="h-px w-10 shrink-0 bg-[#b18a2d]" />

              <span className="h-px w-5 shrink-0 bg-[#1aa8a8]" />

              <span className="ml-1 text-[9px] font-bold uppercase tracking-[0.23em] text-[#168b8d] sm:text-[10px]">
                Rethinking Comfort
              </span>
            </div>
          </motion.div>

          {/* =======================================================
              RIGHT SIDE
          ======================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="min-w-0 w-full"
          >
            {/* =====================================================
                CONNECTED QUESTION + ANSWER CARD
            ===================================================== */}
            <div className="relative w-full min-w-0 overflow-hidden rounded-[28px] border border-[#cfded9]/80 bg-white/45 shadow-[0_25px_70px_rgba(12,67,69,0.08)] backdrop-blur-xl sm:rounded-[32px]">
              {/* Decorative glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-28 -top-28 h-[340px] w-[340px] rounded-full bg-[#bde9e3]/35 blur-3xl"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-32 left-[20%] h-[320px] w-[320px] rounded-full bg-[#73d7d0]/10 blur-3xl"
              />

              {/* ===================================================
                  QUESTION
              =================================================== */}
              <div className="relative px-7 pb-8 pt-7 sm:px-9 sm:pb-9 sm:pt-8 lg:px-10 lg:pb-9 lg:pt-9 xl:px-11">
                {/* Small label */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d6c98f]/70 bg-[#f4f2df]/70">
                    <Sparkles
                      size={15}
                      strokeWidth={1.7}
                      className="text-[#a17a20]"
                    />
                  </div>

                  <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#9a731e] sm:text-[9px] lg:text-[10px]">
                    We asked a simple question:
                  </span>
                </div>

                {/* Question */}
                <div className="mt-6 border-l border-[#39bdbd] pl-6 sm:mt-7 sm:pl-7 lg:pl-8">
                  <h2 className="max-w-[900px] font-serif text-[29px] font-medium leading-[1.18] tracking-[-0.025em] text-[#063f42] sm:text-[35px] lg:text-[39px] xl:text-[42px]">
                    What if furniture could actively manage your{" "}
                    <em className="font-serif text-[#1ca5a7]">
                      personal temperature
                    </em>{" "}
                    instead of simply surrounding you?
                  </h2>
                </div>
              </div>

              {/* ===================================================
                  CONNECTING DIVIDER
              =================================================== */}
              <div className="relative px-7 sm:px-9 lg:px-10 xl:px-11">
                <div className="h-px w-full bg-[#b9d4d0]/70" />
              </div>

              {/* ===================================================
                  ANSWER
              =================================================== */}
              <div className="relative px-7 pb-7 pt-7 sm:px-9 sm:pb-8 sm:pt-8 lg:px-10 lg:pb-9 lg:pt-8 xl:px-11">
                {/* Small label */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#b99b48]/50 bg-[#063f42]">
                    <ArrowRight
                      size={15}
                      strokeWidth={1.7}
                      className="text-[#d6bd72]"
                    />
                  </div>

                  <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#9a731e] sm:text-[9px] lg:text-[10px]">
                    That question led to ClimateCraft.
                  </span>
                </div>

                {/* Answer */}
                <p className="mt-6 max-w-[940px] text-[15px] font-medium leading-[1.75] text-[#245d63] sm:mt-7 sm:text-[16px] lg:text-[17px]">
                  That question led to ClimateCraft. We set out to combine the
                  familiar comfort of a premium recliner with technology that
                  can actively control temperature around the body's key
                  contact areas.
                </p>

                {/* Bottom signature */}
                <div className="mt-7 flex items-center gap-3 sm:mt-8">
                  <span className="h-px w-10 shrink-0 bg-[#b18a2d]" />

                  <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#168b8d] sm:text-[9px]">
                    ClimateCraft
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default BrandStatement;