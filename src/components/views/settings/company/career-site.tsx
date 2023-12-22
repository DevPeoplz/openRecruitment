import { Button } from '@/components/ui/Button'
import { PencilIcon } from '@heroicons/react/20/solid'
import React from 'react'

const CareerSiteSettings = () => {
  return (
    <div>
      <div>
        <h3 className="text-lg">Subdomain</h3>
        <div className="flex items-center justify-between">
          <p className="text-gray-500">test@test.co</p>
          <Button
            variant="outline"
            size="small"
            icon={<PencilIcon className="h-4" />}
            onClick={() => console.log('edit')}
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CareerSiteSettings
