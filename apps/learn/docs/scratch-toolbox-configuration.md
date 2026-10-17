# Scratch toolbox configuration

Scratch exercises may optionally define a toolbox in the existing `exercises.check_config` JSONB field. No schema migration is required.

```json
{
  "scratch_toolbox": {
    "allowedCategories": ["motion", "events", "control"],
    "allowedBlockTypes": [
      "motion_movesteps",
      "motion_turnright",
      "event_whenflagclicked",
      "control_repeat"
    ]
  }
}
```

- Omit `scratch_toolbox` (or `toolbox`) for the complete standard Scratch toolbox.
- `allowedCategories` uses Scratch `toolboxitemid` values such as `motion`, `looks`, `sound`, `events`, `control`, `sensing`, `operators`, `variables` and `myBlocks`.
- `allowedBlockTypes` uses Scratch opcode values such as `motion_movesteps` or `control_repeat`.
- A configured category is retained only with configured top-level blocks. Existing project blocks are never removed or changed.
- Extension and custom-block categories remain available only when expressly included in `allowedCategories`; this is deliberate so an exercise can opt in to them.

The restriction updates Scratch GUI's Redux toolbox XML through its `UPDATE_TOOLBOX` action, which updates Blockly with its native `workspace.updateToolbox` flow. It is a teaching aid, not an authorization boundary and not proof that an exercise is complete.
