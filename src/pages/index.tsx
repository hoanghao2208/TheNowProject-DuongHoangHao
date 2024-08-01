import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs'

import { TodoList } from '@/client/components/TodoList'
import { CreateTodoForm } from '@/client/components/CreateTodoForm'

const Index = () => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'pending' | 'completed'>('all');

  return (
    <main className="mx-auto w-[480px] pt-12">
      <div className="rounded-12 bg-white p-8 shadow-sm">
        <h1 className="text-center text-4xl font-extrabold text-gray-900">
          Todo App
        </h1>

        <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as 'all' | 'pending' | 'completed')}>
          <div className="pt-10">
            <TabsList className="flex gap-2">
              <TabsTrigger
                value="all"
                className={`py-2 px-4 rounded-full cursor-pointer ${
                  selectedTab === 'all' ? 'bg-gray-700 text-white' : 'border border-gray-200'
                }`}
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className={`cursor-pointer rounded-full px-4 py-2    ${
                  selectedTab === 'pending' ? 'bg-gray-700 text-white' : 'border border-gray-200'
                }`}
              >
                Pending
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className={`py-2 px-4 rounded-full cursor-pointer ${
                  selectedTab === 'completed' ? 'bg-gray-700 text-white' : 'border border-gray-200'
                }`}
              >
                Completed
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <TodoList status="all" />
            </TabsContent>
            <TabsContent value="pending">
              <TodoList status="pending" />
            </TabsContent>
            <TabsContent value="completed">
              <TodoList status="completed" />
            </TabsContent>
          </div>
        </Tabs>

        <div className="pt-10">
          <CreateTodoForm />
        </div>
      </div>
    </main>
  )
}

export default Index
