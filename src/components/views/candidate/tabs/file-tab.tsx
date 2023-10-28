import React, { FC, useContext } from 'react'
import { Panel } from '@/components/ui/panel'
import PDFViewer from '@/components/pdf-viewer'
import { CandidateContext } from '@/components/views/candidate/candidate-view'
import { EditableFile } from '@/components/ui/edit/editable-file'
import { useCandidateUpdateFile } from '@/hooks/candidate-view'

const FileTab: FC = () => {
  const [candidate, refetchCandidate] = useContext(CandidateContext) ?? []
  const { handleFileUpload } = useCandidateUpdateFile(candidate?.id)

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
              <EditableFile
                label={candidate.cv ? 'Edit' : 'Upload'}
                handleFileUpload={handleFileUpload('coverLetter')}
                fileType={'application/pdf'}
              />
            </PDFViewer.ToolbarItem>
          </PDFViewer>
        </Panel.Body>
      </Panel>
    </>
  )
}

export default FileTab
