// fallmint-api · Express HTTP wrapper around fallmint-sdk · MIT · AI-Native Solutions
import express from 'express';

const app = express();
app.use(express.json({ limit: '10mb' }));

app.get('/health', (_req, res) => res.json({ ok: true, tool: 'fallmint', version: '1.0.0' }));

app.post('/goto', async (req, res) => {
  try {
    const { goto } = await import('@ai-native-solutions/fallmint-sdk');
    const out = typeof goto === 'function' ? await goto(req.body) : { error: 'goto not callable' };
    res.json(out);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/$', async (req, res) => {
  try {
    const { $ } = await import('@ai-native-solutions/fallmint-sdk');
    const out = typeof $ === 'function' ? await $(req.body) : { error: '$ not callable' };
    res.json(out);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/$$', async (req, res) => {
  try {
    const { $$ } = await import('@ai-native-solutions/fallmint-sdk');
    const out = typeof $$ === 'function' ? await $$(req.body) : { error: '$$ not callable' };
    res.json(out);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('fallmint-api listening on :' + PORT));
