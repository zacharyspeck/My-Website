// Figures for "The Bottleneck to the Bottleneck".
// All numbers are the locked results (repo commit 106da8c) supplied by Zach —
// do not edit values here without updating the source study.
// Colors/fonts use the site CSS variables so the figures follow dark mode.

const MONO = 'var(--font-mono, ui-monospace), monospace'
const FG = 'var(--fg)'
const MUTED = 'var(--muted)'
const LINK = 'var(--link)'
const BORDER = 'var(--border)'

type Cell = { mean: number; std?: number } // std absent = baseline single run
type Condition = {
  line1: string // grader dial (or "baseline")
  line2: string // task dial
  single?: boolean // baseline: single run -> outlined bar, no whisker
  a: Cell // first series (easy band, or Task A)
  b: Cell // second series (hard band, or Task B)
}

// Task A — strict exact-match %, [easy band, hard band]
const TASK_A: Condition[] = [
  { line1: 'baseline', line2: '(untrained)', single: true, a: { mean: 56.0 }, b: { mean: 9.0 } },
  { line1: 'strict', line2: 'easy-only', a: { mean: 79.7, std: 3.5 }, b: { mean: 10.0, std: 2.0 } },
  { line1: 'strict', line2: 'easy+hard', a: { mean: 69.7, std: 0.6 }, b: { mean: 11.0, std: 1.0 } },
  { line1: 'loose', line2: 'easy-only', a: { mean: 61.0, std: 1.0 }, b: { mean: 9.7, std: 2.1 } },
  { line1: 'loose', line2: 'easy+hard', a: { mean: 61.0, std: 1.0 }, b: { mean: 12.7, std: 2.1 } },
]

// Task B — all-5-exact %, [easy band, hard band]
const TASK_B: Condition[] = [
  { line1: 'baseline', line2: '(untrained)', single: true, a: { mean: 78.0 }, b: { mean: 16.0 } },
  { line1: 'strict', line2: 'easy-only', a: { mean: 93.7, std: 1.2 }, b: { mean: 19.0, std: 0.0 } },
  { line1: 'strict', line2: 'easy+hard', a: { mean: 95.0, std: 4.0 }, b: { mean: 59.3, std: 5.7 } },
  { line1: 'loose', line2: 'easy-only', a: { mean: 94.7, std: 2.1 }, b: { mean: 17.3, std: 0.6 } },
  { line1: 'loose', line2: 'easy+hard', a: { mean: 93.7, std: 4.0 }, b: { mean: 58.3, std: 2.1 } },
]

// pass@4, hard band %, [Task A, Task B (all-5-exact variant)]
const PASS_AT_4: Condition[] = [
  { line1: 'baseline', line2: '(untrained)', single: true, a: { mean: 15.0 }, b: { mean: 28.0 } },
  { line1: 'strict', line2: 'easy-only', a: { mean: 18.7, std: 2.9 }, b: { mean: 28.0, std: 2.0 } },
  { line1: 'strict', line2: 'easy+hard', a: { mean: 17.0, std: 1.0 }, b: { mean: 73.3, std: 5.7 } },
  { line1: 'loose', line2: 'easy-only', a: { mean: 16.3, std: 2.9 }, b: { mean: 27.7, std: 0.6 } },
  { line1: 'loose', line2: 'easy+hard', a: { mean: 17.3, std: 1.5 }, b: { mean: 72.3, std: 3.8 } },
]

function Fig({
  title,
  caption,
  children,
  maxWidth = 520,
}: {
  title: string
  caption: React.ReactNode
  children: React.ReactNode
  maxWidth?: number
}) {
  return (
    <figure style={{ margin: '2.4rem auto', maxWidth, padding: 0 }}>
      <div
        style={{
          fontFamily: MONO,
          fontSize: '0.72rem',
          lineHeight: 1.5,
          color: 'var(--fg)',
          marginBottom: '0.6rem',
        }}
      >
        {title}
      </div>
      {children}
      <figcaption
        style={{
          fontFamily: MONO,
          fontSize: '0.66rem',
          lineHeight: 1.65,
          color: 'var(--muted)',
          marginTop: '0.55rem',
        }}
      >
        {caption}
      </figcaption>
    </figure>
  )
}

// ---------- shared grouped-bar chart ----------

const W = 420
const PLOT_TOP = 34
const PLOT_BOTTOM = 234
const PLOT_LEFT = 34
const PLOT_RIGHT = 414
const H = 300

function y(v: number) {
  return PLOT_BOTTOM - v * 2 // 0..100 -> 200px
}

function BarChart({
  data,
  unitLabel,
  legendA,
  legendB,
  ariaLabel,
}: {
  data: Condition[]
  unitLabel: string
  legendA: string
  legendB: string
  ariaLabel: string
}) {
  const groupW = (PLOT_RIGHT - PLOT_LEFT) / data.length
  const barW = 24
  const pair = barW * 2 + 4

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ height: 'auto', display: 'block' }}
      role="img"
      aria-label={ariaLabel}
    >
      {/* unit label + legend */}
      <text x={2} y={16} fontFamily={MONO} fontSize={12} fill={MUTED}>
        {unitLabel}
      </text>
      <g fontFamily={MONO} fontSize={12} fill={MUTED}>
        <rect x={230} y={6} width={11} height={11} fill={LINK} />
        <text x={246} y={16}>{legendA}</text>
        <rect x={326} y={6} width={11} height={11} fill={FG} />
        <text x={342} y={16}>{legendB}</text>
      </g>

      {/* gridlines */}
      {[0, 25, 50, 75, 100].map((v) => (
        <g key={v}>
          <line x1={PLOT_LEFT} y1={y(v)} x2={PLOT_RIGHT} y2={y(v)} stroke={BORDER} strokeWidth={1} />
          <text
            x={PLOT_LEFT - 5}
            y={y(v) + 4}
            fontFamily={MONO}
            fontSize={11}
            fill={MUTED}
            textAnchor="end"
          >
            {v}
          </text>
        </g>
      ))}

      {data.map((d, i) => {
        const x0 = PLOT_LEFT + i * groupW + (groupW - pair) / 2
        const cells: Array<{ cell: Cell; x: number; color: string }> = [
          { cell: d.a, x: x0, color: LINK },
          { cell: d.b, x: x0 + barW + 4, color: FG },
        ]
        return (
          <g key={i}>
            {cells.map(({ cell, x, color }, j) => {
              const top = y(cell.mean)
              const hasStd = !d.single && cell.std !== undefined
              const capTop = hasStd ? y(cell.mean + (cell.std as number)) : top
              return (
                <g key={j}>
                  {d.single ? (
                    <rect
                      x={x}
                      y={top}
                      width={barW}
                      height={PLOT_BOTTOM - top}
                      fill="none"
                      stroke={color}
                      strokeWidth={1.5}
                      strokeDasharray="3 2"
                    />
                  ) : (
                    <rect x={x} y={top} width={barW} height={PLOT_BOTTOM - top} fill={color} />
                  )}
                  {hasStd && (cell.std as number) > 0 && (
                    <g stroke={FG} strokeWidth={1.2} opacity={0.85}>
                      <line
                        x1={x + barW / 2}
                        y1={y(cell.mean - (cell.std as number))}
                        x2={x + barW / 2}
                        y2={capTop}
                      />
                      <line x1={x + barW / 2 - 4} y1={capTop} x2={x + barW / 2 + 4} y2={capTop} />
                      <line
                        x1={x + barW / 2 - 4}
                        y1={y(cell.mean - (cell.std as number))}
                        x2={x + barW / 2 + 4}
                        y2={y(cell.mean - (cell.std as number))}
                      />
                    </g>
                  )}
                  <text
                    x={x + barW / 2}
                    y={capTop - 6}
                    fontFamily={MONO}
                    fontSize={12}
                    fill={FG}
                    textAnchor="middle"
                  >
                    {cell.mean.toFixed(1)}
                  </text>
                </g>
              )
            })}
            <text
              x={PLOT_LEFT + i * groupW + groupW / 2}
              y={PLOT_BOTTOM + 18}
              fontFamily={MONO}
              fontSize={12.5}
              fill={FG}
              textAnchor="middle"
            >
              {d.line1}
            </text>
            <text
              x={PLOT_LEFT + i * groupW + groupW / 2}
              y={PLOT_BOTTOM + 34}
              fontFamily={MONO}
              fontSize={12.5}
              fill={MUTED}
              textAnchor="middle"
            >
              {d.line2}
            </text>
          </g>
        )
      })}

      {/* baseline axis */}
      <line x1={PLOT_LEFT} y1={PLOT_BOTTOM} x2={PLOT_RIGHT} y2={PLOT_BOTTOM} stroke={MUTED} strokeWidth={1} />
    </svg>
  )
}

const SEED_NOTE =
  'Bars show the mean of 3 seeds. Whiskers show ±1 sample standard deviation with ddof=1. The baseline is a single untrained run drawn as an outlined bar with no whisker. The sealed OOD exam has 100 easy and 100 hard items per task.'

// ---------- V3 ----------

export function TaskAResultsFigure() {
  return (
    <Fig
      title="Task A is deal-math. The chart shows sealed-exam scores by training condition."
      caption={
        <>
          {SEED_NOTE} The hard band stays flat in every condition. Task A&apos;s hard questions sit
          above the model&apos;s learnable frontier.
        </>
      }
    >
      <BarChart
        data={TASK_A}
        unitLabel="strict exact-match %"
        legendA="easy band"
        legendB="hard band"
        ariaLabel="Grouped bar chart of Task A strict exact-match percentages on the sealed exam. Easy band: baseline 56.0, strict easy-only 79.7, strict easy plus hard 69.7, loose easy-only 61.0, loose easy plus hard 61.0. Hard band: baseline 9.0, strict easy-only 10.0, strict easy plus hard 11.0, loose easy-only 9.7, loose easy plus hard 12.7. The hard band is flat across all conditions."
      />
    </Fig>
  )
}

// ---------- V4 ----------

export function TaskBResultsFigure() {
  return (
    <Fig
      title="Task B is deal-extraction. The chart shows sealed-exam scores by training condition."
      caption={
        <>
          {SEED_NOTE} The metric is all-5-exact %. The hard band jumps only when hard questions
          enter training, and strict versus loose grading barely changes it.
        </>
      }
    >
      <BarChart
        data={TASK_B}
        unitLabel="all-5-exact %"
        legendA="easy band"
        legendB="hard band"
        ariaLabel="Grouped bar chart of Task B all-5-exact percentages on the sealed exam. Easy band: baseline 78.0, strict easy-only 93.7, strict easy plus hard 95.0, loose easy-only 94.7, loose easy plus hard 93.7. Hard band: baseline 16.0, strict easy-only 19.0, strict easy plus hard 59.3, loose easy-only 17.3, loose easy plus hard 58.3. The hard band jumps with easy plus hard training."
      />
    </Fig>
  )
}

// ---------- V5 ----------

export function PassAtKFigure() {
  return (
    <Fig
      title="pass@k on the 100 hard-band items. k=4, so each bar is a best-of-4 score. Task B uses its all-5-exact variant."
      caption={
        <>
          {SEED_NOTE} Task A stays in the mid-to-high teens everywhere. Task B moves only when hard
          questions enter training. pass@1 and pass@4 rise together where the skill is reachable,
          so there is no diversity collapse.
        </>
      }
    >
      <BarChart
        data={PASS_AT_4}
        unitLabel="pass@4 %"
        legendA="Task A"
        legendB="Task B"
        ariaLabel="Grouped bar chart of pass at 4 percentages on the hard band. Task A: baseline 15.0, strict easy-only 18.7, strict easy plus hard 17.0, loose easy-only 16.3, loose easy plus hard 17.3. Task B: baseline 28.0, strict easy-only 28.0, strict easy plus hard 73.3, loose easy-only 27.7, loose easy plus hard 72.3."
      />
    </Fig>
  )
}

// Swap series colors for V5: Task A should read as secondary (muted), Task B as primary (link).
// BarChart colors series a=LINK, b=FG; for V5 Task A is series a. LINK for A and FG for B keeps
// contrast in both themes, so the shared component is used as-is.

// ---------- V1 ----------

function Box({
  x,
  yy,
  w,
  h,
  lines,
  highlight,
  dashed,
}: {
  x: number
  yy: number
  w: number
  h: number
  lines: string[]
  highlight?: boolean
  dashed?: boolean
}) {
  const lh = 15
  const startY = yy + h / 2 - ((lines.length - 1) * lh) / 2 + 4.5
  return (
    <g>
      <rect
        x={x}
        y={yy}
        width={w}
        height={h}
        rx={4}
        fill={highlight ? LINK : 'none'}
        fillOpacity={highlight ? 0.12 : undefined}
        stroke={highlight ? LINK : MUTED}
        strokeWidth={highlight ? 1.8 : 1.1}
        strokeDasharray={dashed ? '4 3' : undefined}
      />
      {lines.map((t, i) => (
        <text
          key={i}
          x={x + w / 2}
          y={startY + i * lh}
          fontFamily={MONO}
          fontSize={12.5}
          fill={highlight ? LINK : FG}
          textAnchor="middle"
        >
          {t}
        </text>
      ))}
    </g>
  )
}

function VArrow({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
  return (
    <g stroke={MUTED} fill={MUTED}>
      <line x1={x} y1={y1} x2={x} y2={y2 - 5} strokeWidth={1.2} />
      <polygon points={`${x - 3.5},${y2 - 6} ${x + 3.5},${y2 - 6} ${x},${y2}`} stroke="none" />
    </g>
  )
}

function HArrow({ y, x1, x2 }: { y: number; x1: number; x2: number }) {
  return (
    <g stroke={MUTED} fill={MUTED}>
      <line x1={x1} y1={y} x2={x2 - 5} y2={y} strokeWidth={1.2} />
      <polygon points={`${x2 - 6},${y - 3.5} ${x2 - 6},${y + 3.5} ${x2},${y}`} stroke="none" />
    </g>
  )
}

export function LandscapeFigure() {
  return (
    <Fig
      title="The lay of the land. This diagram shows machine learning's subdivisions and where RLVR sits."
      caption="The top panel shows the three classic subdivisions of machine learning. The bottom panel shows the frontier-model training pipeline. Pre-training comes first, then the post-training chain of SFT, then RLHF or RLAIF, then RLVR. RL environment companies supply the environments RLVR trains in."
    >
      <svg
        viewBox="0 0 420 496"
        width="100%"
        style={{ height: 'auto', display: 'block' }}
        role="img"
        aria-label="Diagram. Machine learning splits into supervised learning, unsupervised learning, and reinforcement learning. Below, the training pipeline: pre-training feeds post-training, which chains SFT, then RLHF or RLAIF, then RLVR. RL environment companies feed RLVR."
      >
        {/* panel 1: ML subdivisions */}
        <Box x={135} yy={8} w={150} h={30} lines={['machine learning']} />
        <line x1={210} y1={38} x2={73} y2={74} stroke={MUTED} strokeWidth={1.1} />
        <line x1={210} y1={38} x2={210} y2={74} stroke={MUTED} strokeWidth={1.1} />
        <line x1={210} y1={38} x2={347} y2={74} stroke={MUTED} strokeWidth={1.1} />
        <Box x={10} yy={74} w={126} h={44} lines={['supervised', 'learning']} />
        <Box x={147} yy={74} w={126} h={44} lines={['unsupervised', 'learning']} />
        <Box x={284} yy={74} w={126} h={44} lines={['reinforcement', 'learning (RL)']} highlight />

        <line x1={10} y1={148} x2={410} y2={148} stroke={BORDER} strokeWidth={1} />

        {/* panel 2: training pipeline */}
        <text x={10} y={176} fontFamily={MONO} fontSize={12} fill={MUTED}>
          how a frontier model gets trained
        </text>
        <Box x={10} yy={200} w={120} h={36} lines={['pre-training']} />
        <HArrow y={218} x1={130} x2={165} />
        {/* post-training container */}
        <rect x={165} y={192} width={245} height={230} rx={5} fill="none" stroke={MUTED} strokeWidth={1.1} strokeDasharray="4 3" />
        <text x={287.5} y={212} fontFamily={MONO} fontSize={12} fill={MUTED} textAnchor="middle">
          post-training
        </text>
        <Box x={225} yy={224} w={125} h={34} lines={['SFT']} />
        <VArrow x={287.5} y1={258} y2={282} />
        <Box x={225} yy={282} w={125} h={34} lines={['RLHF / RLAIF']} />
        <VArrow x={287.5} y1={316} y2={340} />
        <Box x={225} yy={340} w={125} h={38} lines={['RLVR']} highlight />
        {/* environment companies feeding RLVR */}
        <Box x={10} yy={332} w={140} h={54} lines={['RL environment', 'companies']} dashed />
        <HArrow y={359} x1={150} x2={225} />
      </svg>
    </Fig>
  )
}

// ---------- V2 ----------

export function StudyDesignFigure() {
  const cell = { w: 150, h: 88 }
  const colX = [96, 260]
  const rowY = [64, 168]
  const students = [
    { col: 0, row: 0, label: 'student 1' },
    { col: 1, row: 0, label: 'student 2' },
    { col: 0, row: 1, label: 'student 3' },
    { col: 1, row: 1, label: 'student 4' },
  ]
  return (
    <Fig
      title="Study design. One model is trained four ways and takes one sealed exam."
      caption="4 students, 4 homeworks, same exam. The same base model is copied 4 times and trained 4 ways. The reward dial is loose or strict and the task dial is easy-only or easy+hard, giving the 2×2 grid with 3 seeds per cell. Every student then takes the same sealed out-of-distribution final exam."
    >
      <svg
        viewBox="0 0 420 400"
        width="100%"
        style={{ height: 'auto', display: 'block' }}
        role="img"
        aria-label="Two-by-two study design. Columns: task dial, easy-only versus easy plus hard. Rows: reward dial, loose versus strict. Each of the four cells holds one student trained with 3 seeds. All four students take one sealed out-of-distribution exam."
      >
        {/* column axis */}
        <text x={253} y={18} fontFamily={MONO} fontSize={12} fill={MUTED} textAnchor="middle">
          task dial
        </text>
        <text x={colX[0] + cell.w / 2} y={44} fontFamily={MONO} fontSize={12.5} fill={FG} textAnchor="middle">
          easy-only
        </text>
        <text x={colX[1] + cell.w / 2} y={44} fontFamily={MONO} fontSize={12.5} fill={FG} textAnchor="middle">
          easy+hard
        </text>
        {/* row axis */}
        <text
          x={16}
          y={160}
          fontFamily={MONO}
          fontSize={12}
          fill={MUTED}
          textAnchor="middle"
          transform="rotate(-90 16 160)"
        >
          reward dial
        </text>
        <text x={62} y={rowY[0] + cell.h / 2 + 4} fontFamily={MONO} fontSize={12.5} fill={FG} textAnchor="middle">
          loose
        </text>
        <text x={62} y={rowY[1] + cell.h / 2 + 4} fontFamily={MONO} fontSize={12.5} fill={FG} textAnchor="middle">
          strict
        </text>

        {students.map((s, i) => {
          const x = colX[s.col]
          const yy = rowY[s.row]
          return (
            <g key={i}>
              <rect x={x} y={yy} width={cell.w} height={cell.h} rx={5} fill="none" stroke={MUTED} strokeWidth={1.1} />
              <text x={x + cell.w / 2} y={yy + 34} fontFamily={MONO} fontSize={13} fill={FG} textAnchor="middle">
                {s.label}
              </text>
              <text x={x + cell.w / 2} y={yy + 56} fontFamily={MONO} fontSize={12} fill={MUTED} textAnchor="middle">
                ×3 seeds
              </text>
            </g>
          )
        })}

        <VArrow x={253} y1={264} y2={326} />
        <text x={265} y={300} fontFamily={MONO} fontSize={12} fill={MUTED}>
          all 4 students
        </text>
        <Box x={95} yy={330} w={230} h={46} lines={['one sealed OOD exam']} highlight />
      </svg>
    </Fig>
  )
}
