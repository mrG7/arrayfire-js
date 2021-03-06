/*
Copyright (c) 2014-2015, ArrayFire
Copyright (c) 2015 Gábor Mező aka unbornchikken (gabor.mezo@outlook.com)
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

 * Redistributions in binary form must reproduce the above copyright notice, this
  list of conditions and the following disclaimer in the documentation and/or
  other materials provided with the distribution.

 * Neither the name of the ArrayFire nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

#include "ext.h"
#include "computervision.h"
#include "helpers.h"
#include "arraywrapper.h"
#include "errors.h"
#include "guard.h"
#include "worker.h"

using namespace v8;
using namespace std;
using namespace node;

NAN_METHOD(Orb)
{

    try
    {
        ARGS_LEN(2);
        auto array = *ArrayWrapper::GetArrayAt(info, 0);
        float fastThr=20.f;
        unsigned maxFeat=400;
        float sclFctr=1.5f;
        unsigned levels=4;
        bool blurImg=false;
        if (info.Length() > 1)
        {
            fastThr = info[1]->NumberValue();
        }
        if (info.Length() > 2)
        {
            maxFeat = info[2]->Uint32Value();
        }
        if (info.Length() > 3)
        {
            sclFctr = info[3]->NumberValue();
        }
        if (info.Length() > 4)
        {
            levels = info[4]->Uint32Value();
        }
        if (info.Length() > 5)
        {
            blurImg = info[5]->BooleanValue();
        }
        typedef std::pair<af::features, af::array> result_t;
        typedef Worker<result_t> worker_t;
        auto exec = [=]()
        {
            Guard guard;
            result_t result;
            af::orb(result.first, result.second, array, fastThr, maxFeat, sclFctr, levels, blurImg);
            return result;
        };
        auto conv = [=](worker_t* worker, const result_t& r)
        {
            Nan::EscapableHandleScope scope;
            auto result = Nan::New<Object>();
            result->Set(Nan::New(Symbols::Feat), ToV8Features(r.first));
            result->Set(Nan::New(Symbols::Desc), ArrayWrapper::New(r.second));
            return scope.Escape(result);
        };
        auto worker = new worker_t(GetCallback(info), std::move(exec), std::move(conv));
        Nan::AsyncQueueWorker(worker);
        info.GetReturnValue().SetUndefined();
    }
    ARRAYFIRE_CATCH
}

NAN_METHOD(Fast)
{

    try
    {
        ARGS_LEN(2);
        auto array = *ArrayWrapper::GetArrayAt(info, 0);
        float thr=20.0f;
        unsigned arcLength=9;
        bool nonMax=true;
        float featureRatio=0.05f;
        unsigned edge=3;
        if (info.Length() > 1)
        {
            thr = info[1]->NumberValue();
        }
        if (info.Length() > 2)
        {
            arcLength = info[2]->Uint32Value();
        }
        if (info.Length() > 3)
        {
            nonMax = info[3]->BooleanValue();
        }
        if (info.Length() > 4)
        {
            featureRatio = info[4]->NumberValue();
        }
        if (info.Length() > 5)
        {
            edge = info[5]->Uint32Value();
        }
        typedef Worker<af::features> worker_t;
        auto exec = [=]()
        {
            Guard guard;
            return af::fast(array, thr, arcLength, nonMax, featureRatio, edge);
        };
        auto conv = [=](worker_t* worker, const af::features& feat)
        {
            return ToV8Features(feat);
        };

        auto worker = new worker_t(GetCallback(info), std::move(exec), std::move(conv));
        Nan::AsyncQueueWorker(worker);
        info.GetReturnValue().SetUndefined();
    }
    ARRAYFIRE_CATCH
}

NAN_METHOD(HammingMatcher)
{

    try
    {
        ARGS_LEN(3);
        auto array1 = *ArrayWrapper::GetArrayAt(info, 0);
        auto array2 = *ArrayWrapper::GetArrayAt(info, 1);
        dim_t distDim = 0;
        unsigned nDist = 1;
        if (info.Length() > 2)
        {
            distDim = (dim_t)(info[2]->Uint32Value());
        }
        if (info.Length() > 3)
        {
            nDist = info[3]->Uint32Value();
        }
        typedef std::pair<af::array, af::array> result_t;
        typedef Worker<result_t> worker_t;
        auto exec = [=]()
        {
            Guard guard;
            result_t result;
            af::hammingMatcher(result.first, result.second, array1, array2, distDim, nDist);
            return result;
        };
        auto conv = [=](worker_t* worker, const result_t& r)
        {
            Nan::EscapableHandleScope scope;
            auto result = Nan::New<Object>();
            result->Set(Nan::New(Symbols::Idx), ArrayWrapper::New(r.first));
            result->Set(Nan::New(Symbols::Dist), ArrayWrapper::New(r.second));
            return scope.Escape(result);
        };
        auto worker = new worker_t(GetCallback(info), std::move(exec), std::move(conv));
        Nan::AsyncQueueWorker(worker);
        info.GetReturnValue().SetUndefined();
    }
    ARRAYFIRE_CATCH
}

NAN_METHOD(MatchTemplate)
{

    try
    {
        ARGS_LEN(3);
        auto array1 = *ArrayWrapper::GetArrayAt(info, 0);
        auto array2 = *ArrayWrapper::GetArrayAt(info, 1);
        af::matchType mType = AF_SAD;
        if (info.Length() > 2)
        {
            mType = (af::matchType)(info[2]->Uint32Value());
        }
        typedef Worker<af::array> worker_t;
        auto exec = [=]()
        {
            Guard guard;
            return af::matchTemplate(array1, array2, mType);
        };
        auto conv = [=](worker_t* worker, const af::array& arr)
        {
            return ArrayWrapper::New(arr);
        };

        auto worker = new worker_t(GetCallback(info), std::move(exec), std::move(conv));
        Nan::AsyncQueueWorker(worker);
        info.GetReturnValue().SetUndefined();
    }
    ARRAYFIRE_CATCH
}

NAN_MODULE_INIT(InitComputerVision)
{
    Nan::HandleScope scope;

    Nan::Set(target, Nan::New<String>("orb").ToLocalChecked(), Nan::New<FunctionTemplate>(Orb)->GetFunction());
    Nan::Set(target, Nan::New<String>("fast").ToLocalChecked(), Nan::New<FunctionTemplate>(Fast)->GetFunction());
    Nan::Set(target, Nan::New<String>("hammingMatcher").ToLocalChecked(), Nan::New<FunctionTemplate>(HammingMatcher)->GetFunction());
    Nan::Set(target, Nan::New<String>("matchTemplate").ToLocalChecked(), Nan::New<FunctionTemplate>(MatchTemplate)->GetFunction());
}
