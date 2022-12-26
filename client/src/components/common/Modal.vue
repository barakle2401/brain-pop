<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" @click="handleBackdropClick">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <button @click="close" class="close-button hover pointer">&times;</button>
          <slot name="header"> </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body"> </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer"> </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "Modal",
  methods: {
    close() {
      this.$emit("close");
    },
    handleBackdropClick(e) {
      if (e.path[0].className === "modal-backdrop") {
        this.close();
      }
    },
  },
};
</script>
<style>
.modal-backdrop {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  top: 10vh;
}
.modal {
  background: white;
  border-radius: 10px;
  border: 3px solid var(--gray);
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 330px;
  padding: 20px;
}
.modal-footer {
  display: flex;
  margin-top: auto;
}
.modal-header {
  position: relative;
  justify-content: space-between;
}

.modal-body {
  padding: 5px;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  background: transparent;
  border: 5px solid var(--gray);
  border-radius: 50%;
  font-size: 25px;
  font-weight: bold;
  color: var(--gray);
}
</style>
