import { configureAllowedScripts } from '@ministryofjustice/hmpps-npm-script-allowlist'

export default configureAllowedScripts({
   allowlist: {
      // not needed for runtime
      "node_modules/@parcel/watcher@2.5.0": "FORBID",
      "node_modules/fsevents@2.3.2": "FORBID"
   },
})
