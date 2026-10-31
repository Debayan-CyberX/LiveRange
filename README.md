# LiveRange — interactive concept prototype

Design Experience I · Group 3 · NMIMS MPSTME

## Project concept

LiveRange connects threat intelligence with short SOC training exercises. This browser prototype demonstrates the proposed user experience using the supplied design report and presentation as concept references.

## Run

Open `dist/index.html` in a modern browser. Internet is optional for the Google Fonts; system fonts provide a fallback. For consistent browser storage behavior, serve the `dist` directory with a static server, for example `python -m http.server 8000`, then visit http://localhost:8000.

## Presentation walkthrough

1. Start on Overview to explain the threat-to-training concept.
2. Open Threat intelligence. Search for a CVE or filter by severity.
3. Select a threat and choose Generate scenario pack. The pack appears in Scenario library.
4. Launch Log4Shell and review the fictional SIEM events.
5. Answer the three analyst decisions. Feedback explains each response.
6. Finish to see your score, then open Team readiness to see session history.
7. Export the session report as a text file.

## Implemented

- Responsive dashboard with five navigable work areas.
- Searchable and filterable intelligence inbox with six example entries.
- Threat briefings and simulated pack generation.
- Guided three-step investigation, answer feedback, and calculated scoring.
- Browser-local storage for generated packs and completed session results.
- Illustrative ATT&CK coverage and team readiness dashboard.
- Downloadable report of local session results.

## Scope and limitations

This is a functional interface prototype, not a deployed cyber range. Threat feeds are static examples, historical CVEs are not presented as current disclosures, and scenario generation selects a predefined template rather than calling an AI model. All packs preview the same Log4Shell investigation dataset; the interface discloses this when a different pack is launched. No exploits execute, no hosts are provisioned, and no external systems are contacted by the training workflow.

Team readiness values are illustrative. Quiz scores come from actual answers in this prototype: correct answers / 3 × 100, rounded. Session duration measures time from launch to completion. These values do not establish production SOC performance, MTTD, compliance, or certification. Local browser storage is not an authenticated multi-user database. Clearing browser data removes saved progress.

## Source structure

- `dist/index.html`: application shell and navigation.
- `dist/style.css`: responsive visual design.
- `dist/app.js`: sample records, navigation, filters, exercises, scoring, local persistence, report export.
- `.openai/hosting.json`: static hosting configuration.

## Future production work

Connect vetted NVD/CISA feeds, validate threat-to-technique mappings, implement distinct scenario datasets and a reviewed generation pipeline, add authentication and durable storage, provision isolated range infrastructure, and calculate readiness metrics from validated assessment data.

Source materials supplied by the project team: `designexperience_report (1).pdf` and `LiveRange_Group3_DE1_PPT (1).pptx`. Market and impact claims in those documents are not independently verified or reproduced as prototype outcomes.
