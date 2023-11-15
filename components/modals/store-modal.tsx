"use client"

import * as z from "zod"
import { Modal } from '@/components/ui/modal'
import { useStoreModal } from '@/hooks/use-store-modal'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import {useForm} from "react-hook-form"
import { useState } from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import axios from "axios"
import toast from "react-hot-toast"

const formSchema = z.object ({
  name: z.string().min(1),
})

// this is the default component shown in the browswer. 
const StoreModal = () => {
    const storeModal = useStoreModal()
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>> ({
      resolver: zodResolver (formSchema),
      defaultValues: {
        name: " ",
      },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        setLoading(true);

        const response = await axios.post('/api/stores', values)

        window.location.assign(`/${response.data.id}`)
        
      } catch(error) {
        toast.error("Something went wrong")
      } finally {
        setLoading(false);
      }
    }

  return (
    <Modal
        title='Create your store'
        description='This will create a new store where you can keep all your products'
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
    >
      <div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField 
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder="The girls store"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center items-center mt-4 space-x-9 pt-6">
                <Button 
                  variant="outline"
                  onClick={storeModal.onClose}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  )
}

export default StoreModal