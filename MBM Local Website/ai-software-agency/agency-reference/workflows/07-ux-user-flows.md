# Phase 7 — UX / User Flows

## Purpose
Translate the approved blueprint into detailed UX artifacts: user flows,
information architecture, and screen map that will directly guide prototype creation.

## Role
UX Designer · Information Architect

## Skill
Load and follow: `.agents/skills/ux-design/SKILL.md`

## Inputs Required
- Phase 6: Approved Product Blueprint (GATE-01 cleared)

## AI Actions

### Step 1: Information Architecture
- Define the hierarchy of content and functionality.
- Organize navigation structure.
- Identify primary, secondary, and utility navigation.
- Ensure logical grouping of related features.

### Step 2: Screen Map
Produce a complete screen map listing every screen/view in the MVP.
For each screen, document:
- Screen name
- Purpose (what user can do here)
- Entry points (how user gets here)
- Exit points (where user goes next)
- Key data displayed

Format:
```
[Screen Name]
  ├── [Child Screen / Modal]
  └── [Child Screen / Modal]
```

### Step 3: User Flow Diagrams
For each core use case from the blueprint, produce a detailed user flow.
User flows should show:
- Entry point
- Each decision point
- Each action
- Success path
- Error/failure paths
- Exit point

Flows can be written as numbered step-by-step lists if diagrams are not possible.

### Step 4: UX Annotations
Note any important UX design decisions:
- Interaction patterns chosen
- Accessibility considerations
- Responsive behavior decisions
- State management (empty states, loading states, error states)

### Step 5: Responsive Strategy Recommendation
Based on target users, devices, and workflows, recommend:
- **Mobile-first**: Primary use is on mobile; desktop is secondary
- **Desktop-first**: Primary use is on desktop/laptop (e.g., complex enterprise tool)
- **Tablet-first**: Primary use is on tablet (e.g., field workers)
- **Adaptive**: Different optimized layouts for each primary device type

Document the reasoning. Present to Founder for agreement before prototyping.

## Artifacts Produced
- `docs/ux/user-flows.md` — All user flows
- `docs/ux/screen-map.md` — Complete screen map
- `docs/ux/ux-notes.md` — UX decisions and annotations

## Completion Criteria
- [ ] Screen map covers ALL screens in MVP scope
- [ ] User flows documented for ALL core use cases
- [ ] Error and empty states noted for key flows
- [ ] Responsive strategy decided and documented
- [ ] Founder agreement on responsive strategy confirmed
- [ ] All files committed to Git

## Approval Gate
No hard gate, but confirm responsive strategy and screen map with Founder
before building the prototype.

## Next Phase
→ `08-prototype.md` (GATE-02 follows after prototype)
