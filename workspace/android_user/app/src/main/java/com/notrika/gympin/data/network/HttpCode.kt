package com.notrika.gympin_master.data.network

class HttpCode {

    companion object {

        /* 1XX: INFO */
        val HTTP_CONTINUE = 100

        val HTTP_SWITCHING_PROTOCOLS = 101

        val HTTP_PROCESSING_WEBDAV = 102

        /* 2XX: SUCCESS */

        val HTTP_OK = 200

        val HTTP_CREATED = 201

        val HTTP_ACCEPTED = 202

        val HTTP_NOT_AUTHORITATIVE = 203

        val HTTP_NO_CONTENT = 204

        val HTTP_RESET = 205

        val HTTP_PARTIAL = 206

        val HTTP_MULTI_STATUS_WEBDAV = 207

        val HTTP_ALREADY_REPORTED_WEBDAV = 208

        val HTTP_IM_USED = 226

        /* 3XX: RELOCATION/REDIRECT */

        val HTTP_MULT_CHOICE = 300

        val HTTP_MOVED_PERM = 301

        val HTTP_MOVED_TEMP = 302

        val HTTP_SEE_OTHER = 303

        val HTTP_NOT_MODIFIED = 304

        val HTTP_USE_PROXY = 305

        val HTTP_UNUSED = 306

        val HTTP_TEMPORARY_REDIRECT = 307

        val HTTP_PERMANENT_REDIRECT_EXPERIMENTAL = 308

        /* 4XX: client error */

        val HTTP_BAD_REQUEST = 400

        val HTTP_UNAUTHORIZED = 401

        val HTTP_PAYMENT_REQUIRED = 402

        val HTTP_FORBIDDEN = 403

        val HTTP_NOT_FOUND = 404

        val HTTP_BAD_METHOD = 405

        val HTTP_NOT_ACCEPTABLE = 406

        val HTTP_PROXY_AUTH = 407

        val HTTP_CLIENT_TIMEOUT = 408

        val HTTP_CONFLICT = 409

        val HTTP_GONE = 410

        val HTTP_LENGTH_REQUIRED = 411

        val HTTP_PRECON_FAILED = 412

        val HTTP_ENTITY_TOO_LARGE = 413

        val HTTP_REQ_TOO_LONG = 414

        val HTTP_UNSUPPORTED_TYPE = 415

        val HTTP_REQUESTED_RANGE_NOT_SATISFIABLE = 416

        val HTTP_EXPECTATION_FAILED = 417

        val HTTP_IM_A_TEAPOT_RFC_2324 = 418

        val HTTP_ENHANCE_YOUR_CALM_TWITTER = 420

        val HTTP_UNPROCESSABLE_ENTITY_WEBDAV = 422

        val HTTP_LOCKED_WEBDAV = 423

        val HTTP_FAILED_DEPENDENCY_WEBDAV = 424

        val HTTP_RESERVED_FOR_WEBDAV = 425

        val HTTP_UPGRADE_REQUIRED = 426

        val HTTP_PRECONDITION_REQUIRED = 428

        val HTTP_TOO_MANY_REQUESTS = 429

        val HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE = 431

        val HTTP_NO_RESPONSE_NGINX = 444

        val HTTP_RETRY_WITH_MICROSOFT = 449

        val HTTP_BLOCKED_BY_WINDOWS_PARENTAL_CONTROLS_MICROSOFT = 450

        val HTTP_UNAVAILABLE_FOR_LEGAL_REASONS = 451

        val HTTP_CLIENT_CLOSED_REQUEST_NGINX = 499
        
        /* 5XX: server error */

        val HTTP_SERVER_ERROR = 500

        val HTTP_INTERNAL_ERROR = 500

        val HTTP_NOT_IMPLEMENTED = 501

        val HTTP_BAD_GATEWAY = 502

        val HTTP_UNAVAILABLE = 503

        val HTTP_GATEWAY_TIMEOUT = 504

        val HTTP_VERSION = 505
        
        val HTTP_VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL = 506

        val HTTP_INSUFFICIENT_STORAGE_WEBDAV = 507

        val HTTP_LOOP_DETECTED_WEBDAV = 508

        val HTTP_BANDWIDTH_LIMIT_EXCEEDED_APACHE = 509

        val HTTP_NOT_EXTENDED = 510

        val HTTP_NETWORK_AUTHENTICATION_REQUIRED = 511

        val HTTP_NETWORK_READ_TIMEOUT_ERROR = 598

        val HTTP_NETWORK_CONNECT_TIMEOUT_ERROR = 599

        /* 120XX: Internet Error  */

        val Out_of_Handles = 12001

        val Timeout = 12002

        val Extended_Error = 12003

        val Internal_Error = 12004

        val Invalid_URL = 12005

        val Unrecognized_Scheme = 12006

        val Name_Not_Resolved = 12007

        val Protocol_Not_Found = 12008

        val Invalid_Option = 12009

        val Bad_Option_Length = 12010

        val Option_Not_Settable = 12011

        val Shutdown = 12012

        val Incorrect_User_Name = 12013

        val Incorrect_Password = 12014

        val Login_Failure = 12015

        val Invalid_Operation = 12016

        val Operation_Canceled = 12017

        val Incorrect_Handle_Type = 12018

        val Incorrect_Handle_State = 12019

        val Not_Proxy_Request = 12020

        val Registry_Value_Not_Found = 12021

        val Bad_Registry_Parameter = 12022

        val No_Direct_Access = 12023

        val No_Context = 12024

        val No_Callback = 12025

        val Request_Pending = 12026

        val Incorrect_Format = 12027

        val Item_Not_Found = 12028

        val Cannot_Connect = 12029

        val Connection_Aborted = 12030

        val Connection_Reset = 12031

        val Force_Retry = 12032

        val Invalid_Proxy_Request = 12033

        val Need_UI = 12034

        val Not_Defined = 12035

        val Handle_Exists = 12036

        val Sec_Cert_Date_Invalid = 12037

        val Sec_Cert_CN_Invalid = 12038

        val HTTP_to_HTTPS_on_Redir = 12039

        val HTTPS_to_HTTP_on_Redir = 12040

        val Mixed_Security = 12041

        val Chg_Post_is_Non_Secure = 12042

        val Post_is_Non_Secure = 12043

        val Client_Auth_Cert_Needed = 12044

        val Invalid_CA = 12045

        val Client_Auth_Not_Setup = 12046

        val Async_Thread_Failed = 12047

        val Redirect_Scheme_Change = 12048

        val Dialog_Pending = 12049

        val Retry_Dialog = 12050

        val HTTPS_to_HTTP_Submit_Redir = 12052

        val Insert_CDROM = 12053



        /* 1211X: FTP API Error Codes */


        val Transfer_in_Progress = 12110

        val FTP_Dropped = 12111

        val No_Passive_Mode = 12112



        /* 1213X: Gopher API Error Codes */

        val Protocol_Error = 12130

        val Not_File = 12131

        val Data_Error = 12132

        val End_of_Data = 12133

        val Invalid_Locator = 12134

        val Incorrect_Locator_Type = 12135

        val Not_Gopher_Plus = 12136

        val Attribute_Not_Found = 12137

        val Unknown_Locator = 12138


        /* 121XX: HTTP API Error Codes */
        val Header_Not_Found = 12150

        val Downlevel_Server = 12151

        val Invalid_Server_Response = 12152

        val Invalid_Header = 12153

        val Invalid_Query_Request = 12154

        val Header_Already_Exists = 12155

        val Redirect_Failed = 12156

        val Security_Channel_Error = 12157

        val Unable_to_Cache_File = 12158

        val TC_PIP_not_Installed = 12159

        val Not_Redirected = 12160

        val Cookie_Needs_Confirmation = 12161

        val Cookie_Declined = 12162

        val Disconnected = 12163

        val Server_Unreachable = 12164

        val Proxy_Server_Unreachable = 12165

        val Bad_Auto_Proxy_Script = 12166

        val Unable_to_Download_Script = 12167

        val Redirect_Needs_Confirmation = 12168

        val Sec_Invalid_Cert = 12169

        val Sec_Cert_Revoked = 12170

        val Failed_Due_to_Security_Check = 12171


    }

}