import React, { FC, useContext } from 'react'
import { Panel } from '@/components/ui/panel'
import PDFViewer from '@/components/pdf-viewer'
import { CandidateContext } from '@/components/views/candidate/candidate-view'
import { EditableFile } from '@/components/views/candidate/editable-file'

const FileTab: FC = () => {
  const [candidate, refetchCandidate] = useContext(CandidateContext) ?? []

  if (!candidate) {
    return null
  }

  return (
    <>
      <Panel>
        <Panel.Header>Cover Letter</Panel.Header>
        <Panel.Body>
          <PDFViewer file={candidate.coverLetter}>
            <PDFViewer.ToolbarItem>
              <EditableFile field={'coverLetter'} file={candidate.coverLetter} />
            </PDFViewer.ToolbarItem>
          </PDFViewer>
        </Panel.Body>
      </Panel>
    </>
  )
}

export default FileTab
