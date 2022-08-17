package com.notrika.gympin.ui.main.tickets

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import com.notrika.gympin.R
import com.notrika.gympin.data.model.entity.mock_ticket
import com.notrika.gympin.ui.common.widgets.dialogConfirm.DialogConfirm
import com.notrika.gympin.ui.main.MainPageFragment
import com.notrika.gympin.util.mocks.mockdatas
import kotlinx.android.synthetic.main.fragment_tickets_list.*
import javax.inject.Inject


class FragmentTicketsList : MainPageFragment() {

    private lateinit var viewModel: ViewModelTicketsList

    @Inject
    lateinit var dialogConfirm: DialogConfirm

    @Inject
    lateinit var dialogQrCode: DialogQrCode


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_tickets_list, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel =
            ViewModelProviders.of(this, providerFactory).get(ViewModelTicketsList::class.java)
        fillList()
    }

    private fun fillList() {

        var contents = mockdatas().getTicketsMockData(requireContext())
        var adapeter = AdapterTickets(requestManager, pocket)
        rv_tickets.adapter = adapeter
        adapeter.addItems(contents.data!!)
        adapeter.onEvenetClickListener = object : AdapterTickets.OnEvenetClickListener {
            override fun close(ticket: mock_ticket) {
                deleteTicket(ticket)
            }

            override fun reCreate(ticket: mock_ticket) {

            }

            override fun getQr(ticket: mock_ticket) {
                confirmGetQr(ticket)
            }
        }
    }

    private fun confirmGetQr(ticket: mock_ticket) {

        dialogConfirm?.init(requireActivity())
            ?.setTitle("دریافت بلیط " + ticket.name)
            ?.setMessage("در صورت دربافت بلیط هزینه آن از اعتبار شما کاسته شده و قابل بازگشت نمی باشد.")
            ?.setAction(object : DialogConfirm.OnAction {
                override fun Confirm() {
                    openDialogQr(ticket)
                }

                override fun Dismiss() {

                }
            })
            ?.show()
    }

    private fun openDialogQr(ticket: mock_ticket) {
        dialogQrCode?.init(requireActivity())
            ?.setTitle(ticket.name.toString())
            ?.setQrCode(ticket.code)
            ?.show()
    }

    private fun deleteTicket(ticket: mock_ticket) {

        dialogConfirm?.init(requireActivity())
            ?.setTitle("حذف بلیط " + ticket.name)
            ?.setMessage("شما همیشه میتوانید این بلیط را از قسمت مراکز اضافه کنید ")
            ?.setAction(object : DialogConfirm.OnAction {
                override fun Confirm() {

                }

                override fun Dismiss() {

                }
            })
            ?.show()
    }


}
