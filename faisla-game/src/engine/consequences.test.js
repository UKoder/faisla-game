import { applyPillarEffects, evaluateGameState } from './consequences'

test('applyPillarEffects clamps between 0 and 100', () => {
  const base = { family: 10, crops: 10, finance: 10, resilience: 10 }
  const result = applyPillarEffects(base, {
    family: -50,
    crops: 200,
    finance: 0,
    resilience: 90,
  })
  expect(result.family).toBe(0)
  expect(result.crops).toBe(100)
  expect(result.finance).toBe(10)
  expect(result.resilience).toBe(100)
})

test('evaluateGameState detects pillar collapse', () => {
  const metrics = { family: 0, crops: 50, finance: 50, resilience: 50 }
  const outcome = evaluateGameState(metrics, {})
  expect(outcome.gameOver).toBe(true)
  expect(outcome.reason).toBe('pillar_collapse')
})

