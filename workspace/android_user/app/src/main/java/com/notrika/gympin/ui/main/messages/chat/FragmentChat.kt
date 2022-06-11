package com.notrika.gympin.ui.main.messages.chat

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import com.google.gson.Gson
import com.notrika.gympin.R
import com.notrika.gympin.data.model.OprationResult
import com.notrika.gympin.data.model.res.Res_chat
import com.notrika.gympin.data.model.res.Res_last_chat
import com.notrika.gympin.ui.main.InnerPageFragment
import kotlinx.android.synthetic.main.fragment_main_messages_chat.*
import tech.gusavila92.websocketclient.WebSocketClient
import java.lang.Exception
import java.net.URI
import java.net.URISyntaxException
import kotlin.random.Random


class FragmentChat : InnerPageFragment() {

    private lateinit var viewModel: ViewModelChat

    lateinit var  webSocketClient: WebSocketClient;
    lateinit var adapter:AdapterChat;
    var subscribe = false;
    var userid =0.toLong()


    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_main_messages_chat, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelChat::class.java)
        adapter = AdapterChat(requestManager)
        userid = pocket.userId
        prepareView()

        createWebSocketClient();
    }


    private fun createWebSocketClient() {
        var secret = getRandomString(8)
        var code = Random.nextInt(100, 999)
        var uri: URI?
        try {
            // Connect to local host
            uri = URI("ws://91.98.5.224:2727/gympin/GympinChatEndPoint/"+code.toString()+"/"+secret+"/websocket");
        }
        catch ( e: URISyntaxException) {
            e.printStackTrace();
            return;
        }

        webSocketClient = object: WebSocketClient(uri) {
            override fun onOpen() {
                activity?.runOnUiThread {
//                    txt_result.text="Session is starting"+"\n";
                }
            }

            override fun onTextReceived(message: String?) {
                if(message=="o"){
                    webSocketClient.send("[\"CONNECT\\naccept-version:1.1,1.0\\nheart-beat:10000,10000\\n\\n\\u0000\"]")
                    return;
                }
                if(message=="h"){
                    return;
                }
                if(message?.startsWith("a") == true&&!subscribe){

                    webSocketClient.send("[\"SUBSCRIBE\\nid:sub-0\\ndestination:/chat/${userid}/greetings\\n\\n\\u0000\"]")
                    subscribe=true
                    return
                }
                activity?.runOnUiThread {
                    var chatItem = Res_chat();
                    var _message =("{"+ (message?.split('{')?.get(1)?.split('}')?.get(0) ?: "")+"}").replace("\\","")
                    var greting:Gretting = Gson().fromJson(_message,Gretting::class.java)
                    chatItem.text = greting.foo
                    adapter.addItem(chatItem)
                }
            }

            override fun onBinaryReceived(data: ByteArray?) {

                activity?.runOnUiThread {
//                    txt_result.text = "onBinaryReceived" + "\n";
                }
            }

            override fun onPingReceived(data: ByteArray?) {

                activity?.runOnUiThread {
//                    txt_result.text = "onPingReceived" + "\n";
                }
            }

            override fun onPongReceived(data: ByteArray?) {

                activity?.runOnUiThread {
//                    txt_result.text = "onPongReceived" + "\n";
                }
            }

            override fun onException(e: Exception?) {
                Log.i("WebSocket", e?.message.toString());

                activity?.runOnUiThread {
//                    txt_result.text = e?.message.toString() + "\n" + txt_result.text
                }
            }

            override fun onCloseReceived() {

                activity?.runOnUiThread {
//                    txt_result.text = "Closed " + "\n" + txt_result.text
                }
            }
        };
        webSocketClient.addHeader("Authorization",pocket.userToken)
        webSocketClient.setConnectTimeout(10000);
        webSocketClient.setReadTimeout(60000);
        webSocketClient.enableAutomaticReconnection(5000);
        webSocketClient.connect();
    }
    fun getRandomString(length: Int) : String {
        val allowedChars =  ('a'..'z') + ('0'..'9')
        return (1..length)
            .map { allowedChars.random() }
            .joinToString("")
    }
    private fun prepareView() {
        fillList(null)
        btn_send.setOnClickListener {
            var gretting = Gretting()
            gretting.bar="hi"
            gretting.foo =edt_massage.text.toString()
            gretting.baz = "hi"
            var grettingjson = Gson().toJson(gretting)
            var length = grettingjson.length
            var grettingjsonTosend = grettingjson.replace("\"","\\\"").toString()
            webSocketClient.send("[\"SEND\\ndestination:/app/hello/${userid}\\ncontent-length:$length\\n\\n$grettingjsonTosend\\u0000\"]")
        }
    }

    private fun fillList(contents: OprationResult<Res_last_chat>?) {
        rv_chat.adapter =adapter
        adapter.addItems(ArrayList())
    }

    override fun onDestroy() {
        webSocketClient.close()
        super.onDestroy()
    }
}
