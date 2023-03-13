<template>
  <Layout :max-width="1280">
    <template #one>
      <div class="TripleDes">
        <CryptWrapper
          ref="cryptRef"
          :encrypt="decrypt"
          :type="CryptType.DEC"
          :sample="sample"
        >
          <template #option>
            <div class="option">
              <a-space>
                <span>{{ t('tripleDes.key') }}</span>
                <a-input-password
                  v-model:value="keyString"
                  class="passphrase opt"
                  @change="callCryptMethod"
                />
                <span>{{ t('tripleDes.mode') }}</span>
                <span>
                  <Select
                    v-model:value="cipherType"
                    class="opt"
                    @change="callCryptMethod"
                  >
                    <SelectOption :value="CipherType.CBC">{{
                      CipherType.CBC
                    }}</SelectOption>
                    <SelectOption :value="CipherType.ECB">{{
                      CipherType.ECB
                    }}</SelectOption>
                    <SelectOption :value="CipherType.CFB">{{
                      CipherType.CFB
                    }}</SelectOption>
                    <SelectOption :value="CipherType.CTR">{{
                      CipherType.CTR
                    }}</SelectOption>
                    <SelectOption :value="CipherType.OFB">{{
                      CipherType.OFB
                    }}</SelectOption>
                  </Select>
                </span>
                <span>{{ t('tripleDes.padding') }}</span>
                <span>
                  <Select
                    v-model:value="paddingType"
                    class="opt padding-select"
                    @change="callCryptMethod"
                  >
                    <SelectOption :value="CipherType.Pkcs7">{{
                      CipherType.Pkcs7
                    }}</SelectOption>
                    <SelectOption :value="CipherType.Zero">{{
                      CipherType.Zero
                    }}</SelectOption>
                    <SelectOption :value="CipherType.Iso10126">{{
                      CipherType.Iso10126
                    }}</SelectOption>
                    <SelectOption :value="CipherType.None">{{
                      CipherType.None
                    }}</SelectOption>
                    <SelectOption :value="CipherType.Ansix923">{{
                      CipherType.Ansix923
                    }}</SelectOption>
                  </Select>
                </span>
              </a-space>
            </div>
          </template>
        </CryptWrapper>
      </div>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { message, Select } from 'ant-design-vue'
import CryptoJS from 'crypto-js'
import CryptWrapper from '../@crypt-wrapper/index.vue'
import { CryptType } from '../@crypt-wrapper/const'
import { useI18n } from "vue-i18n";
import { onMounted, ref } from "vue";
import messages from "./lang.json";
const { t } = useI18n({
  locale: window.$he3.lang,
  messages,
});

enum CipherType {
  ECB = 'ECB',
  CBC = 'CBC',
  CFB = 'CFB',
  CTR = 'CTR',
  OFB = 'OFB',
  // padding
  Pkcs7 = 'Pkcs7',
  Zero = 'Zero',
  Iso10126 = 'Iso10126',
  None = 'None',
  Ansix923 = 'Ansix923',
}

const sample =
  'U2FsdGVkX18HpYZQ95oEyhayXGAmObpId4QGqT92taD+stjnZQcNLtxffoCr0fsPY5dz0TxtlrwXbkcU4nz3Rg=='
const keyString = ref('key')
const cipherType = ref(CipherType.CBC)
const paddingType = ref(CipherType.Pkcs7)
const cryptRef = ref()
const callCryptMethod = () => {
  cryptRef.value.handleEncrypt()
}
const decrypt = (rawValue: string) => {
  if (rawValue.length <= 0) {
    message.warning('Please enter the plain text')
    return ''
  }

  if (keyString.value.length <= 0) {
    message.warning('Please enter the key')
    return ''
  }

  let cipherOps = {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }

  switch (cipherType.value) {
    case CipherType.ECB:
      cipherOps.mode = CryptoJS.mode.ECB
      break
    case CipherType.CFB:
      cipherOps.mode = CryptoJS.mode.CFB
      break
    case CipherType.CTR:
      cipherOps.mode = CryptoJS.mode.CTR
      break
    case CipherType.OFB:
      cipherOps.mode = CryptoJS.mode.OFB
      break
  }

  switch (paddingType.value) {
    case CipherType.Zero:
      cipherOps.padding = CryptoJS.pad.ZeroPadding
      break
    case CipherType.Iso10126:
      cipherOps.padding = CryptoJS.pad.Iso10126
      break
    case CipherType.None:
      cipherOps.padding = CryptoJS.pad.NoPadding
      break
    case CipherType.Ansix923:
      cipherOps.padding = CryptoJS.pad.AnsiX923
      break
  }
  try {
    const ripeValue = CryptoJS.TripleDES.decrypt(
      rawValue,
      keyString.value,
      cipherOps,
    ).toString(CryptoJS.enc.Utf8)
    return ripeValue
  } catch (error) {
    message.error(error.message)
    return ''
  }
}
</script>
<style scoped lang="less">
.TripleDes {
  .passphrase {
    width: 150px;
  }
  .padding-select {
    width: 100px;
  }
}
</style>
