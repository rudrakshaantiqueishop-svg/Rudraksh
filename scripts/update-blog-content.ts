import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Replaces each blog post's body with proper rich-text HTML — the same
 * format the Tiptap editor produces (h2/h3, p, strong, ul/ol, blockquote).
 * Keyed by slug. Run with: npx tsx scripts/update-blog-content.ts
 */
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const BODIES: Record<string, string> = {
  "how-to-identify-genuine-rudraksha": `
<p>Genuine Rudraksha beads are seeds of the <em>Elaeocarpus ganitrus</em> tree, and no two are ever identical. Because authentic beads command a premium, the market is full of polished imitations, moulded composites, and beads with artificially carved faces. Learning to read a few reliable signs will save you from most of them.</p>
<h2>Read the mukhi lines first</h2>
<p>The <strong>mukhi</strong> (faces) are the natural clefts that run from the top of the bead to the bottom. On a real bead these lines are continuous, slightly irregular, and follow the bead's natural contours. Carved beads usually betray themselves with lines that are too even, that stop abruptly, or that show tool marks at the edges.</p>
<h3>What to look for</h3>
<ul>
<li>Lines that run unbroken from the stem hole to the base</li>
<li>Natural asymmetry — real faces are rarely perfectly spaced</li>
<li>No filler, paint, or glue inside the clefts</li>
</ul>
<h2>Surface, weight, and structure</h2>
<p>Authentic beads have a naturally uneven, thorny surface with small protrusions and depressions. Weight and density vary by mukhi type and size, so they are best treated as a supporting clue rather than proof on their own. A bead that feels suspiciously light or perfectly smooth deserves a closer look.</p>
<blockquote>Where it matters most — higher mukhi or rare beads — non-destructive X-ray imaging can confirm that the internal seed structure matches the face count claimed on the surface.</blockquote>
<h2>Buy with verification</h2>
<p>The most dependable safeguard is provenance. Reputable sellers document each bead's origin and verification before listing it, and they are happy to explain how a given bead was checked. When authenticity is backed by a clear process rather than a single visual claim, you can wear the bead with confidence.</p>
`,

  "caring-for-sacred-beads-storage-and-cleansing": `
<p>A Rudraksha mala is a natural object, and like any natural object it responds to how it is handled. A little care keeps both the beads and the cord in good condition for years, and for many people that care is itself part of the practice.</p>
<h2>Everyday storage</h2>
<p>Between uses, keep your mala in a soft cloth pouch away from direct sunlight and humidity. Prolonged sun can dry out the bead's natural oils, and damp environments weaken the cord over time. Many practitioners keep their mala in a dedicated space, separate from everyday jewelry, as a mark of respect.</p>
<h2>Gentle cleansing</h2>
<p>Cleansing should be light and infrequent. For routine dust, a soft dry cloth is enough. If a bead needs more, a barely damp cloth wiped over the surface and dried immediately will do the job.</p>
<h3>What to avoid</h3>
<ul>
<li>Soaking or submerging the beads, which affects the cord and surface</li>
<li>Harsh soaps, alcohol, or chemical cleaners</li>
<li>Scrubbing the mukhi lines, where moisture can collect</li>
</ul>
<h2>Occasional conditioning</h2>
<p>Some traditions recommend lightly oiling the beads once or twice a year with a small amount of natural oil such as sandalwood or mustard oil, then buffing off the excess. This restores sheen and protects the surface, but a little goes a long way — over-oiling attracts dust.</p>
<blockquote>Think of maintenance less as cleaning and more as upkeep of something you intend to keep for a long time.</blockquote>
`,

  "understanding-rudraksha-mukhi-meaning": `
<p>If you have shopped for Rudraksha, you have seen beads described as 5 mukhi, 7 mukhi, and so on. The <strong>mukhi</strong> is simply the number of natural faces, or clefts, on the bead — but in tradition the count carries meaning, and it also affects rarity and price.</p>
<h2>What "mukhi" actually refers to</h2>
<p>Each cleft runs the length of the bead and divides its surface into segments. A bead with five clefts is a 5 mukhi; one with seven is a 7 mukhi. The number occurs naturally as the seed develops, which is why some counts are common and others extremely rare.</p>
<h2>The most common beads</h2>
<p>The <strong>5 mukhi</strong> is by far the most widely available and the one most people begin with. Because it is abundant and affordable, it is the bead traditionally used to string the 108-bead mala used for meditation and japa.</p>
<h3>Less common counts</h3>
<ul>
<li><strong>1 mukhi</strong> — exceptionally rare and highly prized</li>
<li><strong>2 to 4 mukhi</strong> — moderately available</li>
<li><strong>6 to 14 mukhi</strong> — progressively rarer as the number rises</li>
</ul>
<h2>Choosing a mukhi</h2>
<p>For daily wear and meditation, a verified 5 mukhi is a sound and traditional choice. Higher mukhi beads are often chosen for specific intentions, but the most important factor is authenticity — a genuine, well-verified bead matters far more than chasing an unusual count.</p>
<blockquote>The number of faces is part of the story, not the whole of it. A real bead, cared for and worn with intention, is the point.</blockquote>
`,

  "choosing-a-rudraksha-bracelet-for-daily-wear": `
<p>A Rudraksha bracelet is one of the easiest ways to keep the beads with you through the day. It is less formal than a full mala and stands up well to everyday routines — provided you choose one that suits how you actually live.</p>
<h2>Match the bead size to your wrist</h2>
<p>Smaller beads sit closer to the wrist and slip easily under a sleeve, which suits office wear and typing. Larger beads make a bolder statement but can catch on cuffs and keyboards. If you are unsure, a medium bead size is the most versatile starting point.</p>
<h2>Consider the stringing</h2>
<p>How a bracelet is strung determines how it wears.</p>
<ul>
<li><strong>Elastic cord</strong> — slips on easily and is forgiving of sizing, but the cord is the first thing to wear out</li>
<li><strong>Knotted thread</strong> — traditional and breathable, with knots that keep beads from rubbing</li>
<li><strong>Silver-capped on a chain</strong> — the most durable option for heavy daily use</li>
</ul>
<h2>Fit and comfort</h2>
<p>A bracelet should rotate freely but not slide over your hand. Leave room for a finger between the beads and your wrist. If you wash your hands often, remember that repeated wetting shortens the life of any cord.</p>
<h2>Living with it</h2>
<p>Take the bracelet off before swimming, bathing, or heavy exercise, and wipe it down occasionally with a dry cloth. Treated sensibly, a daily-wear bracelet becomes a quiet, durable companion rather than something you have to fuss over.</p>
<blockquote>The best bracelet is the one you will actually keep wearing — so choose for your routine, not just for looks.</blockquote>
`,

  "caring-for-brass-and-marble-murtis": `
<p>A well-kept murti can last for generations, but brass and marble each age differently and ask for slightly different care. A simple, consistent routine keeps both looking their best without risking damage.</p>
<h2>Caring for brass murtis</h2>
<p>Brass naturally develops a darker patina over time as it reacts with air. Some people value this aged look; others prefer a bright finish. Either way, regular dusting with a soft dry cloth prevents grime from building up in the detailed areas.</p>
<h3>When brass needs more</h3>
<p>To restore shine, use a paste of lemon and a little salt, or a dedicated brass cleaner, applied gently with a soft cloth. Rinse, then dry thoroughly — leftover moisture causes spotting. Avoid abrasive scourers, which scratch the surface and dull fine engraving.</p>
<h2>Caring for marble murtis</h2>
<p>Marble is porous and stains easily, so the golden rule is to act quickly on any spill. Dust with a soft cloth, and clean with nothing stronger than a damp cloth and, if needed, a drop of pH-neutral soap.</p>
<ul>
<li>Never use vinegar, lemon, or acidic cleaners — they etch marble permanently</li>
<li>Keep marble away from oils and coloured powders that can soak in</li>
<li>Blot spills; do not rub them across the surface</li>
</ul>
<h2>Placement matters</h2>
<p>Keep both materials out of constant direct sunlight and away from damp walls. A stable, dry shelf protects the finish and reduces how often any deeper cleaning is needed.</p>
<blockquote>Gentle and regular always beats harsh and occasional — especially with marble, where damage cannot be undone.</blockquote>
`,

  "significance-of-the-108-bead-siddha-mala": `
<p>Almost every traditional mala has 108 beads, plus one larger <strong>meru</strong> or summit bead. The number is not arbitrary — it appears across many strands of Indian thought, and it shapes how the mala is used in practice.</p>
<h2>Why 108?</h2>
<p>The figure recurs throughout tradition: in the proportions cited in astronomy, in the count of sacred names, and in the structure of many chants. Whatever its origin, 108 has become the standard length for a mala used in <strong>japa</strong>, the repetition of a mantra.</p>
<h2>How the count is used</h2>
<p>In practice, the 108 beads let you complete a fixed number of repetitions without counting in your head. You move bead by bead until you reach the meru, which marks one full round.</p>
<h3>The meru bead</h3>
<p>The summit bead is never crossed. When you reach it, you reverse direction rather than stepping over it — a small gesture of respect that also keeps your count honest across multiple rounds.</p>
<h2>What makes a mala "siddha"</h2>
<p>A siddha mala is one prepared and energised for practice, traditionally with care taken over the quality of each bead and the way the strand is assembled. The result is meant to be a dependable tool you can return to daily.</p>
<ul>
<li>108 counting beads of consistent size</li>
<li>One meru bead marking the start and end of a round</li>
<li>A cord knotted to keep beads evenly spaced</li>
</ul>
<blockquote>The mala is a counting aid and an anchor for attention — its real value shows over months of steady use.</blockquote>
`,

  "gemstone-selection-and-vedic-astrology-principles": `
<p>In Vedic astrology, gemstones are associated with the nine planetary influences known as the <strong>navagraha</strong>. The traditional aim of wearing a stone is to strengthen a beneficial influence in the birth chart — which is why selection is treated as a considered decision, not a matter of taste alone.</p>
<h2>Stones and their planets</h2>
<p>Each principal gemstone is linked to a specific planet.</p>
<ul>
<li><strong>Ruby</strong> — the Sun</li>
<li><strong>Pearl</strong> — the Moon</li>
<li><strong>Red coral</strong> — Mars</li>
<li><strong>Emerald</strong> — Mercury</li>
<li><strong>Yellow sapphire</strong> — Jupiter</li>
<li><strong>Diamond</strong> — Venus</li>
<li><strong>Blue sapphire</strong> — Saturn</li>
</ul>
<h2>Why the chart comes first</h2>
<p>A stone is generally recommended only after the birth chart is read, because the same gem can be supportive for one person and unsuitable for another. This is why traditional practice pairs gemstone selection with consultation rather than buying by appearance.</p>
<h3>Quality factors</h3>
<p>Once a stone is chosen, its quality is judged on clarity, colour, cut, and the absence of cracks or inclusions. A natural, untreated stone is preferred, and its weight is often matched to the wearer.</p>
<h2>A measured approach</h2>
<p>Gemstones are best treated as one supportive element within a broader practice, worn with realistic expectations. Authenticity and correct guidance matter far more than the size or rarity of the stone.</p>
<blockquote>Choose for the chart and for genuine quality — a correctly chosen, natural stone is the foundation of the whole tradition.</blockquote>
`,

  "reading-the-story-behind-antique-ritual-items": `
<p>Antique ritual objects — bells, lamps, boxes, and vessels — carry more than age. Each one reflects the materials, techniques, and devotional habits of the time and place it came from. Learning to read those clues turns a curio into a piece with a story.</p>
<h2>Start with the material</h2>
<p>Most ritual items were cast or worked in brass, bronze, or copper. The colour of the patina, the weight of the piece, and the way the metal has worn at the points of frequent handling all hint at its age and use.</p>
<h2>Look at how it was made</h2>
<p>Hand craftsmanship leaves traces that mass production does not.</p>
<ul>
<li>Slight asymmetry in the form, typical of hand-casting</li>
<li>File and chisel marks where details were finished by hand</li>
<li>Wear concentrated where the object was held or rung</li>
</ul>
<h3>Signs of real use</h3>
<p>A genuine ritual item usually shows honest wear — a bell's clapper contact point, the rim of a lamp darkened by oil, the smoothed edges of a lid opened thousands of times. This kind of wear is hard to fake convincingly.</p>
<h2>Provenance and respect</h2>
<p>Where an object came from, and how it was used, is part of its value. A documented history adds confidence, and handling these pieces with the respect they were made for keeps that history intact.</p>
<blockquote>An antique ritual object is a record of devotion in metal — the marks of use are the most honest part of its story.</blockquote>
`,

  "why-combination-malas-pair-specific-mukhis": `
<p>Combination malas bring together beads of different mukhi counts — and sometimes other sacred beads — on a single strand. The pairings are not random; they follow long-standing ideas about which influences are thought to support one another.</p>
<h2>The logic of pairing</h2>
<p>Each mukhi is traditionally associated with a particular quality or planetary influence. A combination is assembled to bring complementary qualities together, so the strand works toward a specific intention rather than a single, general aim.</p>
<h2>Common combinations</h2>
<p>Some pairings appear again and again because they are believed to balance one another well.</p>
<ul>
<li><strong>5 and 7 mukhi</strong> — a widely worn everyday pairing</li>
<li><strong>1, 4, and 7 mukhi</strong> — combined for a layered intention</li>
<li>Rudraksha paired with a complementary gemstone bead for a planetary focus</li>
</ul>
<h3>Why not just wear more beads?</h3>
<p>The point of a combination is balance, not quantity. Adding beads at random can work against the intended effect, which is why traditional combinations follow established formulas rather than personal preference.</p>
<h2>Choosing a combination</h2>
<p>Start from the intention, then let the pairing follow. As always, the authenticity of every bead on the strand matters more than the combination itself — a thoughtful pairing of genuine beads is what makes the mala worth wearing.</p>
<blockquote>A combination mala is assembled for balance — each bead is chosen for how it works with the others, not on its own.</blockquote>
`,

  "traditional-craft-behind-himalayan-singing-bowls": `
<p>A Himalayan singing bowl looks simple, but a traditional bowl is the result of skilled handwork that gives each piece its distinctive voice. Understanding how they are made explains why no two sound exactly alike.</p>
<h2>Hand-beaten, not cast</h2>
<p>Traditional bowls are hammered from a metal alloy by hand, often by a team working a heated disc in rhythm. The metal is repeatedly heated, beaten, and reshaped until the bowl takes form. The faint, irregular hammer marks on an authentic bowl are signs of this process, not flaws.</p>
<h2>The alloy and its tone</h2>
<p>The character of the sound comes partly from the metal itself. Bowls are made from a bronze alloy, sometimes described in tradition as containing several metals, and small variations in the mix and the wall thickness change the pitch and the length of the ring.</p>
<h3>What gives each bowl its voice</h3>
<ul>
<li>Wall thickness and how evenly it was beaten</li>
<li>The diameter and depth of the bowl</li>
<li>The alloy composition and finishing</li>
</ul>
<h2>Playing and caring for a bowl</h2>
<p>A bowl is played by striking it gently or by running a mallet around the rim to build a sustained tone. Keep it dry, handle it with clean hands, and store it where it will not knock against hard surfaces.</p>
<blockquote>Each hand-beaten bowl carries the marks of its making — and those marks are exactly what give it a sound of its own.</blockquote>
`,

  "wearing-rudraksha-as-a-necklace-styling-and-care": `
<p>Worn as a necklace, Rudraksha sits close to the body and becomes part of how you present yourself day to day. With a little thought about length, pairing, and upkeep, it works as easily with modern clothing as with traditional dress.</p>
<h2>Choosing a length</h2>
<p>Length changes both the look and the feel.</p>
<ul>
<li><strong>Short, close to the throat</strong> — neat under collars and good for layering</li>
<li><strong>Mid-chest</strong> — the most versatile everyday length</li>
<li><strong>Long, below the chest</strong> — traditional and striking, but more prone to swing and catch</li>
</ul>
<h2>Pairing and styling</h2>
<p>A single-bead pendant on a cord or chain reads as understated and pairs with almost anything. A full strand of beads makes more of a statement and sits best over plain, uncluttered necklines. Silver caps and findings dress the beads up for formal wear without overwhelming them.</p>
<h2>Care for something worn against the skin</h2>
<p>Skin contact means more exposure to sweat and oils, so a worn necklace needs slightly more attention than one kept for occasions.</p>
<ul>
<li>Wipe the beads with a dry cloth after a long day of wear</li>
<li>Remove it before showering, swimming, or exercise</li>
<li>Let it air rather than sealing it away damp</li>
</ul>
<blockquote>Worn close and cared for simply, a Rudraksha necklace becomes a quiet daily presence rather than just an accessory.</blockquote>
`,
};

function clean(html: string): string {
  return html.trim().replace(/\n\s*/g, "");
}

async function main() {
  const blogs = await prisma.blog.findMany({ select: { id: true, slug: true, title: true } });

  let updated = 0;
  const missing: string[] = [];

  for (const blog of blogs) {
    const body = BODIES[blog.slug];
    if (!body) {
      missing.push(blog.slug);
      console.warn(`⏭  ${blog.title} (${blog.slug}) — no content written, skipping`);
      continue;
    }
    await prisma.blog.update({ where: { id: blog.id }, data: { body: clean(body) } });
    updated++;
    console.log(`✅ ${blog.title}`);
  }

  console.log("\n── Summary ──────────────────────────────");
  console.log(`Updated: ${updated}/${blogs.length}`);
  if (missing.length > 0) console.log(`No content for: ${missing.join(", ")}`);
}

main()
  .catch((error) => {
    console.error("\nFatal error:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
