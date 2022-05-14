declare interface TriageConfig {
  autoAssignWhenPRCreated?: boolean // Should auto assign the issue creator as assignees.
  COCUrl?: string // default to github.com/:owner/:repo/CODE_OF_CONDUCT.md
  firstTimePRGreetings?: string // first time pull request greetings, exclusive to pRGreetings
  firstTimePRLabels?: string[] // labels auto attached when first time pull request.
  labelsWhenPROpened?: string[] // labels auto attached when PR is opened.
  PRAutoAssignees?: [] // IDs of those needs to be assigned automatically, e.g. PM, PO etc.
  PRGreetings?: string // pull request greetings, exclusive to firstTimePRGreetings.
  guidelineUrl?: string // default to github.com/:owner/:repo/README.md
  skipCollaboratorCheck?: boolean
}
